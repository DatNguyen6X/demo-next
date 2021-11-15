import {NextApiRequest, NextApiResponse} from "next";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import getConfig from 'next/config';
import {apiHandler} from "../../helpers/api/api-handler";
import {findUser} from "../../data/user-repo";

const {serverRuntimeConfig} = getConfig();

async function authenticate(req: NextApiRequest, res: NextApiResponse) {
    const {username, password} = req.body;
    const user = await findUser(username);

    // validate
    if (!(user && bcrypt.compareSync(password, user.password))) {
        throw 'Username or password is incorrect';
    }

    // // create a jwt token that is valid for 7 days
    const token = jwt.sign({sub: user.id}, serverRuntimeConfig.secret, {expiresIn: '1d'});

    // return basic user details and token
    return res.status(200).json({
        id: user.id,
        username: user.username,
        createdAt: user.createdAt,
        token
    });
}

export default apiHandler({
    post: authenticate
});