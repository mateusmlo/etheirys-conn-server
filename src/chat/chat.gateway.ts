import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'ws';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  private logger: Logger = new Logger('ChatGateway');

  @WebSocketServer()
  wss: Server;

  afterInit() {
    this.logger.log('Connected to WebSocket server.');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('send_msg')
  handleMessage(@MessageBody() data: Record<string, string>) {
    const payload = {
      message: data.message,
    };

    this.wss.emit('new_msg', payload);

    return {
      ack: true,
    };
  }
}
