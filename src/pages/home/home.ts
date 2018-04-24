import {Component} from '@angular/core';
import {NavController, App} from 'ionic-angular';
import {AuthCheckerProvider} from "../../providers/auth-service/auth-checker";

import {SignupPage} from '../signup/signup';
import {LoginPage} from '../login/login';
import {DashboardPage} from "../dashboard/dashboard";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public app: App, public navCtrl: NavController, private authCheckerProvider: AuthCheckerProvider) {
        let auth_check = authCheckerProvider.check_connection();
        if (auth_check)
            this.app.getRootNav().push(DashboardPage);
    }

    goToSignup(params) {
        if (!params) params = {};
        this.navCtrl.push(SignupPage);
    }

    goToLogin(params) {
        if (!params) params = {};
        this.navCtrl.push(LoginPage);
    }
}
