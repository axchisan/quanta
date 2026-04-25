import { Room } from 'colyseus';

export class LobbyRoom extends Room {
  onCreate() {
    console.log('LobbyRoom created');
  }

  onJoin(client: any) {
    console.log(`Client ${client.sessionId} joined lobby`);
    this.broadcast('system', { message: `Player ${client.sessionId} joined` });
  }

  onLeave(client: any) {
    console.log(`Client ${client.sessionId} left lobby`);
  }
}