import type { VercelRequest, VercelResponse } from '@vercel/node'
import { NeynarAPIClient, CastParamType } from "@neynar/nodejs-sdk";

// make sure to set your NEYNAR_API_KEY .env
const client = new NeynarAPIClient(String(process.env.NEYNAR_API_KEY));

const ADD_URL = "https://warpcast.com/~/add-cast-action?url=https%3A%2F%2Flikeroot-git-main-pnizos-projects.vercel.app%2Fapi%2Fallowance";
const ENDPOINT = "https://degentipme-3f9959094869.herokuapp.com/api/get_allowance?fid="



export default async function handler(req: VercelRequest, res: VercelResponse) {

    if (req.method === 'GET') {
        const data = {
            name: "checkAllowance",
            icon: "ruby",
            description: "Get DEGEN allowance of the person who casted",
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
        const hash = castId['hash'];

        const query_url = ENDPOINT + fid;
        console.log(query_url);
        
        const axios = require('axios');

        const degen = async () => {
            try {
                const response = await axios.get(query_url);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        } 
        
        const data = {
            message: 'hogehoge'
        }
    
        return res.json(data);
    }
}