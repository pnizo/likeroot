import type { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from "node-fetch"

// make sure to set your NEYNAR_API_KEY .env
//const key = "2B1AA1A8-8757-4CEE-82D2-3C37BDC70D62"
//const client = new NeynarAPIClient(String(process.env.NEYNAR_API_KEY));
const api_key = String(process.env.NEYNAR_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {

  const url = "https://warpcast.com/pnizo.eth/0x3321413d"

  const options = {
    method: 'GET',
    headers: {accept: 'application/json', api_key: api_key}
  };

  const api_url = 'https://api.neynar.com/v2/farcaster/cast?identifier=' + encodeURI(url) + '&type=url';

  console.log(api_url);
    
  const response = await fetch(api_url, options);
  console.log(response);

  const data = await response.json();
  console.log(data);

    // .then(response => {
    //   console.log(response.json());
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   data = String(response.json());
    // })
    // .then(response => console.log(response))
    // .catch(err => console.error(err));
 
  return res.json(data);
}
