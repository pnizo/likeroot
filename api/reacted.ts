import type { VercelRequest, VercelResponse } from '@vercel/node'

const ADD_URL = "https://warpcast.com/~/add-cast-action?url=https%3A%2F%2Flikeroot-git-main-pnizos-projects.vercel.app%2Fapi%2Freacted";
const EXEC_ENDPOINT = "https://api.dune.com/api/v1/query/3669778/execute"
const RESULT_ENDPOINT = "https://api.dune.com/api/v1/execution"

export default async function handler(req: VercelRequest, res: VercelResponse) {

    if (req.method === 'GET') {
        const data = {
            name: "Reacted Today?",
            icon: "ruby",
            description: "Count reactions from me to you",
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
        //console.log(JSON.stringify(body));
        
        const axios = require('axios');

        var msg = '';
        var fid = body['fid'];
        var target_fid = body['castId']['fid'];

        const header = {
            'X-Dune-API-Key': process.env.DUNE_API_KEY,
            'Content-Type': "application/json",
        };
        const exec_body = {
            "query_parameters": {
                "fid": fid,
                "target_fid": target_fid,
            }
        };
        console.log(exec_body);

        var exec_id = '';

        try {
            const res = await axios.post(EXEC_ENDPOINT, exec_body, {headers: header});
            //console.log(res.data);
            exec_id = res.data['execution_id'];
        } catch(err) {
            console.log(err);
            msg = 'HTTP POST error';
        };

        console.log(RESULT_ENDPOINT + '/' + exec_id + '/results');

        var count = 0;
        var state = 'QUERY_STATE_PENDING';

        while (state !== 'QUERY_STATE_COMPLETED') {
            await mySleep(1000);
            try {
                const res = await axios.get(RESULT_ENDPOINT + '/' + exec_id + '/results', {headers: header, data: {}});
                state = res.data['state'];
                if (state === 'QUERY_STATE_COMPLETED') {
                    console.log(res.data);
                    count = res.data['result']['metadata']['row_count'];
                }
    
            } catch(err) {
                console.log(err);
                return res.json({message: 'HTTP GET error'});
            };
        }

        msg = '# of Reaction: ' + String(count);
     
        const data = {
            message: msg
        }
    
        return res.json(data);
    }
}

function mySleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

