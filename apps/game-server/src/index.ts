import express from 'express';
import { createServer } from 'http';
import { Server } from 'colyseus';
import { LobbyRoom } from './rooms/LobbyRoom.js';

const app = express();
const httpServer = createServer(app);
const gameServer = new Server({ server: httpServer });

gameServer.define('lobby', LobbyRoom);

const PORT = Number(process.env.PORT) || 2567;

httpServer.listen(PORT, () => {
  console.log(`🎮 Quanta Game Server running on port ${PORT}`);
});