import type { VercelRequest, VercelResponse } from '@vercel/node'
//import { NeynarAPIClient, CastParamType } from "@neynar/nodejs-sdk";

//const client = new NeynarAPIClient(String(process.env.NEYNAR_API_KEY));
const api_key = String(process.env.NEYNAR_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {

  const url = "https://warpcast.com/pnizo.eth/0x3321413d"

  const sdk = require('api')('@neynar/v2.0#383tp2tluyfljqe');

  sdk.cast({type: 'url', api_key: api_key, url: url})
    .then(({ data }) => console.log(data))
    .catch(err => console.error(err));
 
  return res.json(data);
}
