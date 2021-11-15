import {NextApiRequest, NextApiResponse} from "next";

const expressJwt = require('express-jwt');
const util = require('util');
import getConfig from 'next/config';

const {serverRuntimeConfig} = getConfig();

export function jwtMiddleware(req: NextApiRequest, res: NextApiResponse) {
    const middleware = expressJwt({secret: serverRuntimeConfig.secret, algorithms: ['HS256']}).unless({
        path: [
            // public routes that don't require authentication
            '/api/register',
            '/api/authenticate',
            '/api/videos',
        ]
    });

    return util.promisify(middleware)(req, res);
}