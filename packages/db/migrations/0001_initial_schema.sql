-- Initial schema for Quanta
-- Creates all core tables per docs/06-data-model.md

BEGIN;

-- Helper function for updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- PROFILES
-- ============================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nickname TEXT NOT NULL UNIQUE,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE POLICY "Profiles are viewable by authenticated users"
    ON profiles FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON profiles FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);

-- ============================================
-- GUEST SESSIONS
-- ============================================
CREATE TABLE guest_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nickname TEXT NOT NULL,
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    linked_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE POLICY "Guest sessions viewable by owner"
    ON guest_sessions FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Guest sessions insertable by service role"
    ON guest_sessions FOR INSERT
    TO service_role
    WITH CHECK (true);

-- ============================================
-- ROOMS
-- ============================================
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    mode TEXT NOT NULL CHECK (mode IN ('kahoot', 'duel', 'coop', 'tournament')),
    host_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'in_progress', 'finished')),
    max_players INT NOT NULL DEFAULT 40,
    settings JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    started_at TIMESTAMPTZ,
    finished_at TIMESTAMPTZ
);

CREATE POLICY "Rooms viewable by anyone"
    ON rooms FOR SELECT
    TO authenticated, anon
    USING (status IN ('waiting', 'in_progress'));

CREATE POLICY "Authenticated users can create rooms"
    ON rooms FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = host_id OR host_id IS NULL);

CREATE POLICY "Only host can update room"
    ON rooms FOR UPDATE
    TO authenticated
    USING (auth.uid() = host_id);

-- ============================================
-- ROOM MEMBERSHIPS
-- ============================================
CREATE TABLE room_memberships (
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    guest_session_id UUID REFERENCES guest_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'player' CHECK (role IN ('host', 'player', 'spectator')),
    joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    left_at TIMESTAMPTZ,
    CONSTRAINT room_memberships_user_or_guest CHECK (
        (user_id IS NOT NULL AND guest_session_id IS NULL) OR
        (user_id IS NULL AND guest_session_id IS NOT NULL)
    ),
    PRIMARY KEY (room_id, COALESCE(user_id, guest_session_id))
);

CREATE INDEX room_memberships_user_id_idx ON room_memberships(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX room_memberships_guest_session_id_idx ON room_memberships(guest_session_id) WHERE guest_session_id IS NOT NULL;

CREATE POLICY "Room members can view other members"
    ON room_memberships FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Service role can manage memberships"
    ON room_memberships FOR ALL
    TO service_role
    USING (true);

-- ============================================
-- CHALLENGES
-- ============================================
CREATE TABLE challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE,
    title TEXT NOT NULL,
    subject TEXT NOT NULL CHECK (subject IN ('physics', 'chemistry', 'mixed')),
    topic TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    kind TEXT NOT NULL CHECK (kind IN ('simulation', 'drag_drop', 'multiple_choice', 'numeric_input')),
    statement TEXT NOT NULL,
    payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    solution JSONB NOT NULL,
    explanation_template TEXT,
    creator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_predefined BOOLEAN NOT NULL DEFAULT false,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'flagged', 'removed')),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER challenges_updated_at
    BEFORE UPDATE ON challenges
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX challenges_status_idx ON challenges(status) WHERE status = 'published';
CREATE INDEX challenges_subject_topic_idx ON challenges(subject, topic) WHERE status = 'published';

CREATE POLICY "Published challenges viewable by anyone"
    ON challenges FOR SELECT
    TO authenticated, anon
    USING (status = 'published' OR (status = 'draft' AND creator_id = auth.uid()));

CREATE POLICY "Authenticated users can create challenges"
    ON challenges FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = creator_id OR creator_id IS NULL);

CREATE POLICY "Creators can update their challenges"
    ON challenges FOR UPDATE
    TO authenticated
    USING (auth.uid() = creator_id);

-- ============================================
-- CHALLENGE ATTEMPTS
-- ============================================
CREATE TABLE challenge_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    guest_session_id UUID REFERENCES guest_sessions(id) ON DELETE SET NULL,
    room_id UUID REFERENCES rooms(id) ON DELETE SET NULL,
    submitted_answer JSONB NOT NULL,
    is_correct BOOLEAN NOT NULL,
    score INT NOT NULL,
    time_taken_ms INT NOT NULL,
    feedback TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT challenge_attempts_user_or_guest CHECK (
        (user_id IS NOT NULL AND guest_session_id IS NULL) OR
        (user_id IS NULL AND guest_session_id IS NOT NULL)
    )
);

CREATE INDEX challenge_attempts_challenge_id_idx ON challenge_attempts(challenge_id, created_at DESC);
CREATE INDEX challenge_attempts_user_id_idx ON challenge_attempts(user_id) WHERE user_id IS NOT NULL;

CREATE POLICY "Users can view their own attempts"
    ON challenge_attempts FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage attempts"
    ON challenge_attempts FOR ALL
    TO service_role
    USING (true);

-- ============================================
-- CHALLENGE ASSETS
-- ============================================
CREATE TABLE challenge_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    kind TEXT NOT NULL CHECK (kind IN ('sprite', 'background', 'audio_narration', 'audio_sfx')),
    storage_path TEXT NOT NULL,
    provider TEXT,
    prompt_hash TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE POLICY "Service role manages assets"
    ON challenge_assets FOR ALL
    TO service_role
    USING (true);

-- ============================================
-- AI CACHE
-- ============================================
CREATE TABLE ai_cache (
    key TEXT PRIMARY KEY,
    kind TEXT NOT NULL CHECK (kind IN ('text', 'image', 'audio')),
    value JSONB NOT NULL,
    provider TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    hit_count INT NOT NULL DEFAULT 0
);

CREATE POLICY "Service role manages cache"
    ON ai_cache FOR ALL
    TO service_role
    USING (true);

-- ============================================
-- CHALLENGE REPORTS
-- ============================================
CREATE TABLE challenge_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    reporter_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    reason TEXT NOT NULL CHECK (reason IN ('inappropriate', 'incorrect', 'duplicate', 'other')),
    details TEXT,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'resolved', 'dismissed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE POLICY "Users can create reports"
    ON challenge_reports FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = reporter_user_id);

CREATE POLICY "Service role manages reports"
    ON challenge_reports FOR ALL
    TO service_role
    USING (true);

-- ============================================
-- WEEKLY RANKINGS (Materialized View)
-- ============================================
CREATE MATERIALIZED VIEW rankings_weekly AS
SELECT
    user_id,
    date_trunc('week', created_at) AS week,
    SUM(score) AS total_score,
    COUNT(*) AS attempts_count,
    COUNT(*) FILTER (WHERE is_correct) AS correct_count
FROM challenge_attempts
WHERE user_id IS NOT NULL
GROUP BY user_id, week
WITH NO DATA;

CREATE UNIQUE INDEX rankings_weekly_user_week_idx ON rankings_weekly(user_id, week);

COMMIT;