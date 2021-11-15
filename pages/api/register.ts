import {apiHandler} from "../../helpers/api/api-handler";
import {NextApiRequest, NextApiResponse} from "next";
import {createUser, findUser} from "../../data/user-repo";
import {User} from "../../helpers/interfaces";
import moment from "moment";

const bcrypt = require('bcryptjs');

async function register(req: NextApiRequest, res: NextApiResponse) {
    // split out password from user details
    const {password, username} = req.body;

    const user = await findUser(username);
    console.log('user:', user);
    if (user) {
        throw `User with the username "${user.username}" already exists`;
    }
    const newUser: User = {
        createdAt: moment.utc().toDate(),
        password: bcrypt.hashSync(password, 10),
        username: username
    };

    await createUser(newUser);

    return res.status(201).json({success: true});
}

export default apiHandler({
    post: register
});