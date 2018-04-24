import {Component} from '@angular/core';
import { NavController, App} from 'ionic-angular';

@Component({
    selector: 'page-logout',
    templateUrl: 'logout.html',
})
export class LogoutPage {

    constructor(public navCtrl: NavController, public app: App) {
        localStorage.clear();
        const root = this.app.getRootNav();
        root.popToRoot();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LogoutPage');
    }

}
