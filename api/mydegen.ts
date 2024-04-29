import type { VercelRequest, VercelResponse } from '@vercel/node'

const ADD_URL = "https://warpcast.com/~/add-cast-action?url=https%3A%2F%2Flikeroot-git-main-pnizos-projects.vercel.app%2Fapi%2Fmydegen";
const ENDPOINT = "https://www.degentip.me/api/get_allowance?fid="

export default async function handler(req: VercelRequest, res: VercelResponse) {

    if (req.method === 'GET') {
        const data = {
            name: "RT My DEGEN",
            icon: "eye",
            description: "Check DEGEN allowance of myself",
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
        //const castId = body['castId']
        const fid = body['fid'];

        const query_url = ENDPOINT + fid;
        
        const axios = require('axios');

        var msg = '';

        await axios
            .get(query_url)
            .then((response) => {
                console.log(response.data);
                const dat = response.data['allowance'];
                msg = '👛: ' + dat['remaining_allowance'] + '/' + dat['tip_allowance'] + 
                ' Rank: ' + dat['user_rank'];
            })
            .catch((err) => {
                console.log(err);
                msg = 'HTTP error: ' + err.response.status + ' ' + err.response.statusText;
            });
        
        const data = {
            message: msg
        }
    
        return res.json(data);
    }
}