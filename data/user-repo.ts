import {User} from "../helpers/interfaces";
import ObjectID from "bson-objectid";
import moment from "moment";
import lodash from 'lodash';
import {readFileSync, writeFileSync} from "fs";
import {usersDbFile} from "./db";

export function readUsers() {
    let data: any = readFileSync(usersDbFile);
    if (!data) {
        data = [];
    } else {
        try {
            data = JSON.parse(data.toString());
        } catch (e) {
            data = [];
        }
    }

    return data;
}

export async function createUser(user: User) {
    if (!user.id) {
        user.id = (new ObjectID()).toString();
    }
    user.createdAt = moment.utc().toDate();

    const docs = readUsers();
    docs.push(user);

    try {
        writeFileSync(usersDbFile, JSON.stringify(docs, null, 2), 'utf8');
    } catch (e) {
        console.log('An error has occurred ', e);
    }

    return;
}


export async function findUser(username: string) {
    const users = readUsers();
    return lodash.chain(users).find({username}).value();
}

export async function findUserById(id: string) {
    const users = readUsers();
    return lodash.chain(users).find({id}).value();
}