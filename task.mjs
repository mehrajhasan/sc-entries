import dotenv from 'dotenv'; 
import got from 'got';
import { CookieJar } from 'tough-cookie';
import { HttpsProxyAgent } from 'https-proxy-agent';
dotenv.config();

class Script{
    constructor(){
        this.name = process.env.NAME;
        this.email = process.env.EMAIL;
        this.region = process.env.REGION;
        this.url1 = process.env.URL1;
        this.url2 = process.env.URL2;

        this.cookieJar = new CookieJar();
        this.proxyAgent = new HttpsProxyAgent('http://127.0.0.1:8888');

        this.client = got.extend({
            cookieJar: this.cookieJar,
            agent: {
                https: this.proxyAgent, 
            },
            https: {
                rejectUnauthorized: false, 
            },
        });

        this.steps = {
            0: this.fetch.bind(this),
            1: this.submitFirst.bind(this),
        };
    }

    async fetch(){
        const baseURL = this.url1;

        const headers = {
            "sec-ch-ua": `"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"`,
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": `"macOS"`,
            "upgrade-insecure-requests": "1",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
            "sec-purpose": "prefetch;prerender",
            "purpose": "prefetch",
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "sec-fetch-site": "none",
            "sec-fetch-mode": "navigate",
            "sec-fetch-user": "?1",
            "sec-fetch-dest": "document",
            "accept-encoding": "gzip, deflate, br, zstd",
            "accept-language": "en-US,en;q=0.9",
            "host": "live.umusic.com",
            "Connection": "close"
        };

        try{
            console.log("Getting page");
            await this.client.get(baseURL, {
                headers
            });
        }
        catch(err){
            console.log("Error Message:", err);
        }

    }

   

    async start(){
        await this.steps[0]();
        await this.steps[1]();
    }
}

const task = new Script();
task.start();