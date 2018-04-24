import {Component} from '@angular/core';
import {NavController, LoadingController, ToastController} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {AuthCheckerProvider} from "../../providers/auth-service/auth-checker";

import {LoginPage} from "../login/login";
import {DashboardPage} from "../dashboard/dashboard";

@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage {
    reponseData: any;
    public userData = {'first_name': '', 'last_name': '', 'email': '', 'password': ''};

    constructor(public navCtrl: NavController, private authCheckerProvider: AuthCheckerProvider, public authServiceProvider: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
        let auth_check = authCheckerProvider.check_connection("Welcome, you can register !", true);
        if (auth_check) {
            let t_redirect = this.loadingCtrl.create({content: 'We redirect you...'});
            t_redirect.present();
            this.navCtrl.push(DashboardPage);
            t_redirect.dismiss();
            return;
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignupPage');
    }

    process() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        setTimeout(() => {
            this.signup(loading);
        }, 100);
    }

    signup(loading) {
        let logRes = this.authServiceProvider.postData(this.userData, 'register');

        if (logRes['error'] === false) {
            this.reponseData = logRes['results'];
            localStorage.setItem('userData', JSON.stringify(this.userData));

            loading.onDidDismiss(() => {
                this.login();
            });
        } else {
            let toast = this.toastCtrl.create({
                message: logRes['message'],
                duration: 3000,
                position: 'bottom'
            });

            toast.present();
        }
        loading.dismiss();
    }

    login() {
        this.navCtrl.push(LoginPage);
    }
}
