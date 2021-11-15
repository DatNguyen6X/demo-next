import {Video} from "../helpers/interfaces";
import moment from "moment";
import lodash from "lodash";
import {readFileSync, writeFileSync} from "fs";
import {videosDbFile} from "./db";

export function readVideos() {
    let data: any = readFileSync(videosDbFile);
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

export async function createVideo(video: Video) {
    if (!video.createdAt) {
        video.createdAt = moment.utc().toDate();
    }
    const docs = readVideos();

    docs.push(video);

    try {
        writeFileSync(videosDbFile, JSON.stringify(docs, null, 2), 'utf8');
    } catch (e) {
        console.log('An error has occurred ', e);
    }

    return;
}

export async function findVideo(id: string) {
    const docs = readVideos();
    return lodash.chain(docs).find({id}).value();
}

export async function listVideos() {
    const docs = readVideos();
    return lodash.chain(docs).sortBy(['createdAt']).reverse().value();
}