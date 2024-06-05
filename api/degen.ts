import type { VercelRequest, VercelResponse } from '@vercel/node'

const ADD_URL = "https://warpcast.com/~/add-cast-action?url=https%3A%2F%2Flikeroot-git-main-pnizos-projects.vercel.app%2Fapi%2Fdegen";


export default async function handler(req: VercelRequest, res: VercelResponse) {

    if (req.method === 'GET') {
        const data = {
            name: "Real-Time DEGEN Checker",
            icon: "ruby",
            description: "Real-Time DEGEN checker",
            aboutUrl: "https://warpcast.com/pnizo.eth",
            action: {
              type: "post",
              url: ADD_URL,
            },
          };
          return res.json(data);
    }
    else {
        
        const data = {
            "type": "frame",
            "frameUrl": "https://degen-smoky.vercel.app/frame"
        }
    
        return res.json(data);
    }
}