import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModelService } from '../../models/user';
import { UserService } from '../../services/user';

@Component({
    selector: 'app-index',
    templateUrl: './signup.html',
    styleUrls: ['./signup.scss']
})
export class SignupComponent implements OnInit {
    createUserEmail;
    createUserPassword;
    createUserPasswordAgain;

    constructor(
        private router: Router,
        public userService: UserService,
        private userModelService: UserModelService
    ) {}

    ngOnInit() {
    }

    async userCreate() {
        const response = await this.userModelService.create(this.createUserEmail, this.createUserPassword, this.createUserPasswordAgain);
        if (response.code === 200) {
            alert('Пользователь создан!');
            this.router.navigate(['/main']);
        }
    }
}
