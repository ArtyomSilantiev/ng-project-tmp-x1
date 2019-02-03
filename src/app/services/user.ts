import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage';
import { UserModelService, UserModel } from '../models/user';
import { WebsocketService } from './websocket';

@Injectable()
export class UserService {
    private userModelService: UserModelService;

    public token;
    private authCode = null;
    public isAuth = false;
    public user: UserModel;

    private afterInitResolves = [];
    private isInit = false;

    constructor(
        private ls: LocalStorageService,
        private wsService: WebsocketService
    ) {}

    public async init(
        userModelService: UserModelService,
    ) {
        this.userModelService = userModelService;
        this.authCode = this.ls.getItem('authCode');
        await this.update();

        this.isInit = true;
        this.afterInitResolves.forEach(resolve => resolve());
        this.afterInitResolves = [];
    }

    public async update() {
        const response = await this.userModelService.getAuthInfo();
        if (response.code === 200) {
            this.token = response.data.token;
            if (response.data.isAuth) {
                this.isAuth = true;
                this.user = new UserModel(response.data.user);
            }
        }
    }

    public async login(email: string, password: string) {
        const response = await this.userModelService.login(email, password);

        if (response.code === 200) {
            this.authCode = response.data.authCode;
            this.ls.setItem('authCode', this.authCode);
            this.isAuth = true;
            this.user = new UserModel(response.data.user);
            this.wsService.auth();
            return true;
        }

        return false;
    }

    public async logout() {
        const response = await this.userModelService.logout();

        if (response.code === 200) {
            this.authCode = '';
            this.ls.setItem('authCode', '');
            this.isAuth = false;
            this.user = null;
            this.wsService.logout();
            return true;
        }

        return false;
    }

    public getToken(): string {
        return this.token;
    }

    public getAuthCode(): string {
        return this.authCode;
    }

    public async waitInit() {
        if (this.isInit) {
            return;
        } else {
            return new Promise((resolve) => {
                this.afterInitResolves.push(resolve);
            });
        }
    }
}
