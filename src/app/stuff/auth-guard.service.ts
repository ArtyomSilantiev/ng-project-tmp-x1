import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(public userService: UserService, public router: Router) {}

    async canActivate(): Promise<boolean> {
        await this.userService.waitInit();

        if (!this.userService.isAuth) {
            this.router.navigate(['main']);
            return false;
        }

        return true;
    }
}
