import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { UserService } from './services/user';
import { UserModelService } from './models/user';
import { ApiService } from './services/api';
import { WebsocketService } from './services/websocket';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'jenga';

    constructor(
        private http: HttpClient,
        private router: Router,
        public userService: UserService,
        public userModelService: UserModelService,
        public apiService: ApiService,
        public wsService: WebsocketService
    ) {}

    async ngOnInit() {
        await this.apiService.init(this.http, this.userService);
        await this.userService.init(this.userModelService);
        await this.wsService.init(this.userService);
    }
}
