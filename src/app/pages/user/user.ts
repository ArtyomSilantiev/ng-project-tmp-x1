import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user';
import { UserModelService } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../../models/user';

@Component({
    selector: 'app-user',
    templateUrl: './user.html',
    styleUrls: ['./user.scss']
})
export class UserComponent implements OnInit, OnDestroy {
    public isOwner = false;
    private userId;
    private userModel: UserModel = new UserModel({});
    private paramsSub;

    constructor(
        public userService: UserService,
        public userModelService: UserModelService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.paramsSub = this.activatedRoute.params.subscribe(async (params) => {
            this.userId = params.id;
            await this.userService.waitInit();
            if (this.userId !== this.userService.user.id) {
                this.isOwner = false;
                const userResponse = await this.userModelService.getById(this.userId);
                if (userResponse.code === 200) {
                    this.userModel = new UserModel(userResponse.data.user);
                    console.log('this.userModel', this.userModel);
                }
            } else {
                this.isOwner = true;
                this.userModel = this.userService.user;
            }
        });
    }

    ngOnDestroy(): void {
        if (this.paramsSub) {
            this.paramsSub.unsubscribe();
        }
    }
}
