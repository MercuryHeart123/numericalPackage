import * as WebSocket from 'ws';
import { Server } from 'http';
interface IConnection {
    broadcast: (message: any) => void;
    add: (id: string, ws: WebSocket) => void;
    getUniqueID: () => string;

}
export class WebSocketService implements IConnection {
    private connections: Map<string, WebSocket>;
    private wss: WebSocket.Server;
    constructor(server: Server) {
        this.connections = new Map<string, WebSocket>();
        this.wss = new WebSocket.Server({ server: server, path: '/ws' });
        this.wss.on('connection', (ws: WebSocket) => {
            let id = this.getUniqueID()
            this.add(id, ws)
            ws.send(JSON.stringify("Connected to server"))
            ws.on('close', () => {
                this.remove(id)
                console.log('Client disconnected');
            });

        });
    }

    getUniqueID = (): string => {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4();
    };

    add(id: string, ws: WebSocket) {
        this.connections.set(id, ws)
    }

    remove(id: string) {
        this.connections.delete(id);
    }

    broadcast(message: any) {
        let data = `~ $ ${new Date().toLocaleTimeString()} : ${message}`
        console.log(data);
        this.connections.forEach((connection) =>
            connection.send(JSON.stringify(data))
        );
    }
}
