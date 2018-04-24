import {ToastController} from 'ionic-angular';
import {Injectable} from '@angular/core';

@Injectable() export class AuthCheckerProvider {

    constructor(private toastCtrl: ToastController) {

    }

    /*
     * Checking if session is active depending of a token_expiration parameter
     * sent back by the API on connect.
     * Offline check.
     */
    public check_connection(str_action = "", bool_show_toasts = false, i_duration = 2000) {
        let message = "";
        let return_val = false;

        if (localStorage.getItem('user_id') && localStorage.getItem('token_id')) {
            let token_expiration = localStorage.getItem('token_expiration');

            if (token_expiration.length > 0) {
                if (token_expiration - Date.now() > 0) {
                    return_val = true;
                    message = "Valid session token.";
                } else
                    message = "Your session expired." + " " + str_action;
            } else
                message = "Invalid session token."

        } else
            message = str_action

        if (bool_show_toasts)
            if (message.length)
                this.toastCtrl.create({
                    message: message,
                    duration: i_duration,
                    position: 'bottom'
                }).present();
        return return_val;
    }

}
