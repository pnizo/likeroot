import type { VercelRequest, VercelResponse } from '@vercel/node'
import { NeynarAPIClient, CastParamType } from "@neynar/nodejs-sdk";

// make sure to set your NEYNAR_API_KEY .env
const client = new NeynarAPIClient(String(process.env.NEYNAR_API_KEY));

const ADD_URL = "https://warpcast.com/~/add-cast-action?url=https%3A%2F%2Flikeroot-git-main-pnizos-projects.vercel.app%2Fapi%2Facttest";
//const ADD_URL = "https://warpcast.com/~/add-cast-action?postUrl="https%3A%2F%2Fcastactions.xyz%2Fremind&name=Remind%20me%20in%2010%20days+"&actionType=post&icon=heart"

export default async function handler(req: VercelRequest, res: VercelResponse) {
    console.log(ADD_URL);

    if (req.method === 'GET') {
        const data = {
            name: "hello",
            icon: "heart",
            description: "test action",
            aboutUrl: "https://x.com/pnizo",
            action: {
              type: "post",
              url: ADD_URL,
            },
          };
          return res.json(data);
    }
    else {
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
}