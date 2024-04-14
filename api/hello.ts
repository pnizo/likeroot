import type { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch'

const api_key = String(process.env.NEYNAR_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {

  const url = "https://warpcast.com/pnizo.eth/0x3321413d"

  const options = {
    method: 'GET',
    headers: {accept: 'application/json', api_key: api_key}
  };

  console.log(api_key);
  
  const api_url = 'https://api.neynar.com/v2/farcaster/cast?identifier=' + encodeURI(url) + '&type=url';

  console.log(api_url);
    
  const response = await fetch(api_url, options);
  console.log(response);

  const data = await response.json();
  console.log(data);
 
  return res.json(data);
}
