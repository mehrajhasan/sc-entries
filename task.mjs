import dotenv from 'dotenv'; 
import got from 'got';
import { CookieJar } from 'tough-cookie';
import { HttpsProxyAgent } from 'https-proxy-agent';
dotenv.config();

class Script{
    constructor(){
        //change accordingly
        this.name = process.env.NAME;
        this.email = process.env.EMAIL;
        this.region = process.env.REGION;
        this.url1 = process.env.URL1;
        this.submit1 = process.env.SUBMIT1;
        this.url2 = process.env.URL2;
        this.submit2 = process.env.SUBMIT2;

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
            2: this.submitSecond.bind(this),
        };
    }

    async fetch(){
        const baseURL = this.url1;

        //headers for url1
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

    async submitFirst(){
        const submitURL = this.submit1;

        //headers for the submit1
        const headers = {
            "sec-ch-ua-platform": '"macOS"',
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
            "accept": "application/json, text/plain, */*",
            "sec-ch-ua": '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
            "content-type": "application/json",
            "sec-ch-ua-mobile": "?0",
            "origin": "https://live.umusic.com",
            "sec-fetch-site": "same-site",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            "referer": "https://live.umusic.com/",
            "accept-encoding": "gzip, deflate, br, zstd",
            "accept-language": "en-US,en;q=0.9",
            "priority": "u=1, I"
        };

        const payload = {
            campaignId: "6ffbd1478e104b4f89cfcdcc80e587ea",
            promotionId: "dec2e751-c524-45ec-a270-68d8933d654f",
            submission: {
                email: this.email,
                country: this.region,
                customFieldMeta: "[{\"id\":\"firstName\",\"type\":\"TEXT\",\"options\":[],\"label\":\"Name\"}]",
                firstName: this.name
            },
            weight: 1
        };

        try{
            console.log("Submitting details")
            const response = await this.client.post(submitURL, payload, {
                headers: headers,
            });

            //console.log(response.body);
        }
        catch(err){
            //console.log("Error Message:", err);
        }
    }

    async submitSecond(){
        const getSecond = this.url2;
        const submitURL2 = this.submit2;

        const headers = {
            "sec-ch-ua": '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "upgrade-insecure-requests": "1",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "navigate",
            "sec-fetch-user": "?1",
            "sec-fetch-dest": "document",
            "referer": "https://live.umusic.com/sabrinapresaleuk2025",
            "accept-encoding": "gzip, deflate, br, zstd",
            "accept-language": "en-US,en;q=0.9"
        };

        const postHeaders = {
            "Host": "forms.umusic-online.com",
            "Connection": "keep-alive",
            "sec-ch-ua-platform": '"macOS"',
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "sec-ch-ua": '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
            "Content-Type": "application/json",
            "sec-ch-ua-mobile": "?0",
            "Access-Control-Allow-Headers": "Content-Type",
            "Origin": "https://live.umusic.com",
            "Sec-Fetch-Site": "cross-site",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            "Referer": "https://live.umusic.com/",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Accept-Language": "en-US,en;q=0.9"
        };

        const payload = {
            "consumer_country": this.region,
            "email": this.email,
            "acquisition_sys": "6d697261",
            "campaign_id": "6ffbd1478e104b4f89cfcdcc80e587ea",
            "client_id": "ccd9e50215ae31835839528b670f1a50d00cb8a462da9134003d1d46f45d81f5",
            "host_url": "https://live.umusic.com/sabrinapresaleuk2025/confirm",
            "dm_addressbooks": [36699965]
        }

        try{
            console.log("Getting confirm page")
            let res = await this.client.get(getSecond, {
                headers,
            });

            let postRes = await this.client.post(submitURL2, {
                json: payload,
                headers: postHeaders
            });

            // console.log(postRes.body);
            // console.log(postRes.status);
            // console.log(postRes.statusText);

        }
        catch(err){
            console.log("Error message:", err);
        }

    }




    async start(){
        await this.steps[0]();
        await this.steps[1]();
        await this.steps[2]();
    }
}

const task = new Script();
task.start();