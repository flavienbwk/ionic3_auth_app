import {Component} from '@angular/core';
import {AboutPage} from '../about/about';
import {DashboardPage} from "../dashboard/dashboard";
import {LogoutPage} from "../logout/logout";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    dashboardRoot = DashboardPage;
    aboutPage = AboutPage;
    logoutPage = LogoutPage;

    constructor() {

    }
}
