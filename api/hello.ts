import type { VercelRequest, VercelResponse } from '@vercel/node'
import { NeynarAPIClient, CastParamType } from "@neynar/nodejs-sdk";

// make sure to set your NEYNAR_API_KEY .env
const client = new NeynarAPIClient(String(process.env.NEYNAR_API_KEY));

export default async function handler(req: VercelRequest, res: VercelResponse) {

  const url = "https://warpcast.com/pnizo.eth/0x3321413d"

  const cast = await client.lookUpCastByHashOrWarpcastUrl(url, CastParamType.Url);

  console.log(cast);
  
      const reactions = cast['cast']['reactions'];
      const likes = reactions['likes'];

      console.log(likes);
      
      var msg = '';

      likes.forEach((like) => { 
        msg += like['fname'] + ' ';
        console.log(msg); // Access the 'fname' property correctly
      })
      
     const data = {
        message: msg.substring(0, 29)
     }
 
  return res.json(data);
}