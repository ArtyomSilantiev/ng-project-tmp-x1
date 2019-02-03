import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.html',
    styleUrls: ['./signin.scss']
})
export class SigninComponent implements OnInit {
    loginEmail;
    loginPassword;

    constructor(
        public userService: UserService,
        private router: Router
    ) {}

    ngOnInit() {
    }

    async login() {
        const result = await this.userService.login(this.loginEmail, this.loginPassword);
        if (result) {
            alert('Вы сделали логин!');
            this.router.navigate(['/main']);
        }
    }
}
