import type { VercelRequest, VercelResponse } from '@vercel/node'

const ADD_URL = "https://warpcast.com/~/add-cast-action?url=https%3A%2F%2Flikeroot-git-main-pnizos-projects.vercel.app%2Fapi%2Fdegen";
const ENDPOINT = "https://www.degentip.me/api/get_allowance?fid=";
const FRAME_URL = "https://degen-smoky.vercel.app/";


export default async function handler(req: VercelRequest, res: VercelResponse) {

    if (req.method === 'GET') {
        const data = {
            name: "DEGEN Checker",
            icon: "eye",
            description: "Real-Time DEGEN checker",
            aboutUrl: "https://warpcast.com/pnizo.eth",
            action: {
              type: "post",
              postUrl: ADD_URL,
            },
          };
          return res.json(data);
    }
    else {
        const body = await req['body']['untrustedData'];
        const castId = body['castId']
        const caster_fid = castId['fid'];
        const my_fid = body['fid'];

        const axios = require('axios');

        const caster_query_url = ENDPOINT + caster_fid;

        let caster_degen = '-1';
        let caster_allowance = '-1';
        let caster_rank = '-1';
        let caster_name = 'N/A';


        await axios
            .get(caster_query_url)
            .then((response) => {
                //console.log(response.data);
                const dat = response.data['allowance'];
                caster_degen = String(dat['remaining_allowance']);
                caster_allowance = String(dat['tip_allowance']);
                caster_rank = String(dat['user_rank']);
                caster_name = dat['display_name'];
            })
            .catch((err) => {
                console.log(err);
                return res.json({message: 'error: something went wrong'});
            });

        const my_query_url = ENDPOINT + my_fid;
        let my_degen = '-1';
        let my_allowance = '-1';
        let my_rank = '-1';
        let my_name = 'N/A';

        await axios
        .get(my_query_url)
        .then((response) => {
            //console.log(response.data);
            const dat = response.data['allowance'];
            my_degen = String(dat['remaining_allowance']);
            my_allowance = String(dat['tip_allowance']);
            my_rank = String(dat['user_rank']);
            my_name = dat['display_name'];
        })
        .catch((err) => {
            console.log(err);
            return res.json({message: 'error: something went wrong'});
        });    

        // const frame_url = FRAME_URL + '?caster_degen=' + caster_degen + '&caster_allowance=' + caster_allowance + '&caster_rank=' + caster_rank + '&caster_name=' + caster_name + '&my_degen=' + my_degen + '&my_allowance=' + my_allowance + '&my_rank=' + my_rank + '&my_name=' + my_name;

        // const data = {
        //     type: "frame",
        //     //frameUrl: encodeURI(frame_url)
        //     frameUrl: FRAME_URL
        // }
        const data = {
            type: "message",
            message: `${caster_name}: ${caster_degen}/${caster_allowance} | ${my_name}: ${my_degen}/${my_allowance}`,
        }

        console.log(data);
    
        return res.json(data);
    }
}