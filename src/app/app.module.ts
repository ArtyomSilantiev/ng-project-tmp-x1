// core
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { NotifierModule } from 'angular-notifier';

// app component
import { AppComponent } from './app.component';

// page components
import { IndexComponent } from './pages/index/index';
import { SigninComponent } from './pages/signin/signin';
import { SignupComponent } from './pages/signup/signup';
import { UserComponent } from './pages/user/user';

// components

// modals components
import { ConfirmModalComponent } from './modals/confirm/confirm';

// model services
import { UserModelService } from './models/user';

// services
import { WebsocketService } from './services/websocket';
import { ApiService } from './services/api';
import { UserService } from './services/user';
import { LocalStorageService } from './services/local-storage';
import { AuthGuardService } from './stuff/auth-guard.service';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NotifierModule.withConfig({
            position: {
                horizontal: {
                    position: 'right'
                },
                vertical: {
                    position: 'top'
                }
            }
        })
    ],
    providers: [
        UserModelService,

        WebsocketService,
        ApiService,
        UserService,
        LocalStorageService,
        AuthGuardService
    ],
    declarations: [
        AppComponent,
        IndexComponent,
        UserComponent,
        SigninComponent,
        SignupComponent,

        ConfirmModalComponent
    ],
    entryComponents: [
        ConfirmModalComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
