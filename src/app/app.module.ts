import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';

import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';
import {DashboardPage} from '../pages/dashboard/dashboard';
import {TabsPage} from '../pages/tabs/tabs';

import {AuthServiceProvider} from '../providers/auth-service/auth-service';
import {AuthCheckerProvider} from "../providers/auth-service/auth-checker";
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage,
        SignupPage,
        DashboardPage,
        TabsPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage,
        SignupPage,
        DashboardPage,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AuthServiceProvider,
        AuthCheckerProvider,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
