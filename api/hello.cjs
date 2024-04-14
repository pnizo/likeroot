import type { VercelRequest, VercelResponse } from '@vercel/node'
import { NeynarAPIClient, CastParamType } from "@neynar/nodejs-sdk";

// make sure to set your NEYNAR_API_KEY .env
const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
//  console.log(req);

  const url = "https://warpcast.com/pnizo.eth/0x3321413d"

  const cast = await client.lookUpCastByHashOrWarpcastUrl(url, CastParamType.Url);
  
  const reactions = cast['cast']['reactions'];
  const likes = reactions['likes'];
  
  var msg = '';

  likes.forEach((like) => { 
    msg += like['fname'] + ' ';
    console.log(like['fname']);
  })
  
 const data = {
    message: msg.substring(0, 29)
 }
 
  return res.json(data);
}
