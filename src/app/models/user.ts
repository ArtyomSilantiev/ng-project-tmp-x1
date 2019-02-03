import { Injectable } from '@angular/core';
import { ApiService } from '../services/api';
import * as _ from 'lodash';

export class UserModel {
    public id;
    public email;
    public avatar = '';
    public first_name = '';
    public last_name = '';
    public password_hash;

    public created_at;
    public updated_at;

    constructor(object) {
        this.parseFromObject(object);
    }

    parseFromObject(object) {
        for (const param in object) {
            if (object[param] !== undefined) {
                this[param] = object[param];
            }
        }
    }
}

@Injectable()
export class UserModelService {
    constructor(private apiService: ApiService) {}

    public async getById(userId): Promise<any> {
        return await this.apiService.get('/user/' + userId);
    }

    public async getAuthInfo(): Promise<any> {
        return await this.apiService.get('/user');
    }

    public async create(email: string, password: string, passwordAgain: string): Promise<any> {
        return await this.apiService.post('/user/create', {
            email,
            password,
            passwordAgain
        });
    }

    public async login(email: string, password: string): Promise<any> {
        return await this.apiService.post('/user/login', {
            email,
            password
        });
    }

    public async logout(): Promise<any> {
        return await this.apiService.post('/user/logout');
    }
}
