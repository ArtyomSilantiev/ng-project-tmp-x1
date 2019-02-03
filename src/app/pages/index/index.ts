import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket';
import { ApiService } from '../../services/api';
import { UserModelService } from '../../models/user';
import { UserService } from '../../services/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { ConfirmModalComponent } from '../../modals/confirm/confirm';

@Component({
    selector: 'app-index',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class IndexComponent implements OnInit {
    fullScreen = false;

    constructor(
        private wsService: WebsocketService,
        private apiService: ApiService,
        public userService: UserService,
        private userModelService: UserModelService,
        private modalService: NgbModal,
        private notifierService: NotifierService
    ) {}

    helloWs() {
        this.wsService.emit('hello');
    }

    async helloApi() {
        const responce = await this.apiService.get('/hello');
        if (responce.code === 200) {
            console.log('message from api: ', responce.data.message);
        }
    }

    async openModal(content) {
        await this.modalService.open(ConfirmModalComponent);
    }

    showNotify() {
        this.notifierService.notify('success', 'Notify!');
    }

    ngOnInit() {
        this.wsService.needEvent('hello:res');

        this.wsService.eventEmiter.on('hello:res', data => {
            console.log('message from ws: ', data.message);
        });
    }

    async logout(event) {
        event.preventDefault();
        const result = await this.userService.logout();
        if (result) {
            alert('Вы вышли из системы.');
        }
    }

    toogleFullScreen() {
        if (!this.fullScreen) {
            const element: any = document.documentElement;

            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
            this.fullScreen = true;
        } else {
            const document: any = window.document;

            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            this.fullScreen = false;
        }
    }
}
