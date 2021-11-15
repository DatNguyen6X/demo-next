import {NextApiRequest, NextApiResponse} from "next";
import {errorHandler} from "./error-handler";
import {jwtMiddleware} from "./jwt-middleware";
import {userSubject} from "../user";
import getConfig from "next/config";
import {HeadersInit} from "next/dist/server/web/spec-compliant/headers";

const {publicRuntimeConfig} = getConfig();

export const youTubeGetID = (url: string) => {
    const [a, , b] = url
        .replace(/(>|<)/gi, '')
        .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (b !== undefined) {
        return b.split(/[^0-9a-z_-]/i)[0];
    } else {
        return a;
    }
};

export function authHeader(url: string): HeadersInit {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = userSubject.value;
    const isLoggedIn = user && user.token;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

export function apiHandler(handler: any) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const method = req?.method?.toLowerCase();

        if (method) {
            // check handler supports HTTP method
            if (!handler[method]) {
                return res.status(405).end(`Method ${req.method} Not Allowed`);
            }

            try {
                // global middleware
                await jwtMiddleware(req, res);

                // route handler
                await handler[method](req, res);
            } catch (err) {
                // global error handler
                errorHandler(err, res);
            }
        }
    }
}