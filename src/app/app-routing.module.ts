import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './stuff/auth-guard.service';

import { IndexComponent } from './pages/index/index';
import { SigninComponent } from './pages/signin/signin';
import { SignupComponent } from './pages/signup/signup';
import { UserComponent } from './pages/user/user';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
    }, {
        path: 'main',
        component: IndexComponent
    }, {
        path: 'signin',
        component: SigninComponent
    }, {
        path: 'signup',
        component: SignupComponent
    }, {
        path: 'user/:id',
        component: UserComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
