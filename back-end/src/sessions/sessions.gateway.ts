import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SessionsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private activeClients = new Set<string>();

  handleConnection(client: Socket) {
    this.activeClients.add(client.id);
    this.server.emit('activeSessions', this.activeClients.size);
  }

  handleDisconnect(client: Socket) {
    this.activeClients.delete(client.id);
    this.server.emit('activeSessions', this.activeClients.size);
  }
}
