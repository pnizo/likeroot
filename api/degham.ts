import type { VercelRequest, VercelResponse } from '@vercel/node'
import { NeynarAPIClient, CastParamType } from "@neynar/nodejs-sdk";

// make sure to set your NEYNAR_API_KEY .env
const client = new NeynarAPIClient(String(process.env.NEYNAR_API_KEY));

const ADD_URL = "https://warpcast.com/~/add-cast-action?url=https%3A%2F%2Flikeroot-git-main-pnizos-projects.vercel.app%2Fapi%2Fdegham";
const DEG_ENDPOINT = "https://www.degentip.me/api/get_allowance?fid=";
const HAM_ENDPOINT = "https://farcaster.dep.dev/lp/tips/";

export default async function handler(req: VercelRequest, res: VercelResponse) {

    if (req.method === 'GET') {
        const data = {
            name: "RT 🎩🍖 Checker",
            icon: "smiley",
            description: "Check HAM allowance of the person who casted",
            aboutUrl: "https://warpcast.com/pnizo.eth",
            action: {
              type: "post",
              url: ADD_URL,
            },
          };
          return res.json(data);
    }
    else {
        const body = await req['body']['untrustedData'];
        const castId = body['castId']
        const fid = castId['fid'];

        const axios = require('axios');

        var deg_msg = '';
        var ham_msg = '';

        const deg_query_url = DEG_ENDPOINT + fid;
        await axios
        .get(deg_query_url)
        .then((response) => {
            console.log(response.data);
            const dat = response.data['allowance'];
            deg_msg = '🎩: ' + dat['remaining_allowance'] + '/' + rN(Number(dat['tip_allowance']));
        })
        .catch((err) => {
            console.log(err);
            const msg = 'error: something went wrong';
            return res.json({message: msg});
        });
    

        const ham_query_url = HAM_ENDPOINT + fid;
        await axios
            .get(ham_query_url)
            .then((response) => {
                console.log(response.data);
                const allow = Math.floor(response.data['allowance']);
                const used = Math.ceil(response.data['used']);
                const remain = String(allow - used);
                const received = Math.floor(response.data['received']);
                const tomatoes = Math.floor(response.data['tomatoes']);
                ham_msg = '🍖: ' + remain + '/' + rN(allow);
            })
            .catch((err) => {
                console.log(err);
                const msg = 'error: something went wrong';
                return res.json({message: msg});
            });
        
        const data = {
            message: deg_msg + ' ' + ham_msg
        }
    
        return res.json(data);
    }
}

function rN(num) {
    if (num < 10000) {
        return String(num);
    }
    const digits = Math.log10(num);
    return String(num/1000).substring(0,digits) + 'k';
}