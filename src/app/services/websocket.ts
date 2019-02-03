import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { UserService } from './user';
import * as EventEmitter from 'event-emitter';
@Injectable()
export class WebsocketService {
    private userService: UserService;
    private socket;

    public allNeedEvents = [];
    public eventEmiter: EventEmitter;

    constructor() {
        this.eventEmiter = new EventEmitter();
    }

    public init(
        userService: UserService
    ) {
        this.userService = userService;

        this.socket = io(environment.websocket);

        this.socket.on('connect', () => {
            this.auth();
        });

        for (const wsEventType of this.allNeedEvents) {
            this.socket.on(wsEventType, (data) => {
                this.eventEmiter.emit(wsEventType, data);
            });
        }

        this.socket.on('auth-res', (msg) => {
            console.log('ws auth-res', msg);
        });

        this.socket.on('logout-res', (msg) => {
            console.log('ws logout-res', msg);
        });
    }

    needEvent(type): void {
        if (this.allNeedEvents.indexOf(type) !== -1) {
            return;
        }

        if (this.socket) {
            this.socket.on(type, (data) => {
                this.eventEmiter.emit(type, data);
            });
        }

        this.allNeedEvents.push(type);
    }

    public emit(messageType, messageData?) {
        const sendObj = messageData || {};
        this.socket.emit(messageType, sendObj);
    }

    public auth() {
        this.emit('auth', {
            token: this.userService.getToken() || null,
            authCode: this.userService.getAuthCode() || null
        });
    }

    public logout() {
        this.emit('logout');
    }

    public getSocket() {
        return this.socket;
    }

    public getSocketId() {
        return this.socket.id;
    }
}
