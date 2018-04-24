import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

let API_ACCES_KEY = 'x-ov-api-key'; // Headers example.
let API_ACCESS_VALUE = '1c392287e4ee980d0f5d5ed2a91e34xxxxxxxxxx'; // Headers example.
let API_URLS = {
    'test': 'https://example.com/api',
    'register': 'https://example.com/api/register',
    'login': 'https://example.com/api/login'
};

@Injectable() export class AuthServiceProvider {
    
    constructor(public http: HttpClient) {
    }
    
    postData(credentials, urlIndex) {
        let xml = new XMLHttpRequest();
        xml.open('POST', API_URLS[urlIndex], false);
        xml.setRequestHeader(API_ACCES_KEY, API_ACCESS_VALUE);
        xml.send(this.formatCredentials(credentials));
        return JSON.parse(xml.response);
    }
    
    private formatCredentials(credentials) {
        let data = new FormData();
        // LOGIN - REGISTER - CREDENTIALS //
        if (credentials['username'] != null) {
            data.append('username', credentials['username']);
        }
        if (credentials['password'] != null) {
            data.append('password', credentials['password']);
        }
        if (credentials['email'] != "") {
            data.append('email', credentials['email']);
        }
        if (credentials['phonenumber'] != "") {
            data.append('phonenumber', credentials['phonenumber']);
        }
        // --------------------------- //
        return data;
    }
}