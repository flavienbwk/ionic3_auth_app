import {Component} from '@angular/core';
import {NavController, LoadingController, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {AuthCheckerProvider} from "../../providers/auth-service/auth-checker";

import {TabsPage} from "../tabs/tabs";
import {SignupPage} from "../signup/signup";
import {DashboardPage} from "../dashboard/dashboard";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    public userData = {'email': '', 'password': ''};
    public btn_disabled = true;

    constructor(public navCtrl: NavController, private authCheckerProvider: AuthCheckerProvider, public authServiceProvider: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
        let auth_check = authCheckerProvider.check_connection("Please log in.", true);
        if (auth_check) {
            let t_redirect = this.loadingCtrl.create({content: 'We redirect you...'});
            t_redirect.present();
            this.navCtrl.push(DashboardPage);
            t_redirect.dismiss();
            return;
        }
    }

    ionViewDidLoad() {
        this.btn_disabled = false;
    }

    process() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        setTimeout(() => {
            this.login(loading);
        }, 100);
    }

    login(loading) {
        this.btn_disabled = true;
        let logRes = this.authServiceProvider.postData(this.userData, 'login');

        if (logRes['error'] == "false") {

            localStorage.setItem('user_id', logRes['results']['user_id']);
            localStorage.setItem('token_id', logRes['results']['token_id']);
            localStorage.setItem('token_expiration', logRes['results']['expiration']);

            loading.onDidDismiss(() => {
                this.navCtrl.push(TabsPage);
            });

        } else {
            console.log("Enable.");
            this.btn_disabled = false;
            let toast = this.toastCtrl.create({
                message: logRes['message'],
                duration: 3000,
                position: 'bottom'
            });

            toast.present();
        }
        loading.dismiss();
    }

    signup() {
        this.navCtrl.push(SignupPage);
    }
}