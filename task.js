import dotenv from 'dotenv'; 
import got from 'got';
import { CookieJar } from 'tough-cookie';
import { HttpsProxyAgent } from 'https-proxy-agent';
dotenv.config();

class Script{
    constructor(){
        this.email = process.env.EMAIL;
        this.region = process.env.REGION;
    }

    async firstPage(){
        
    }

    async signUp(){

    }
}

Script();
Script.start();