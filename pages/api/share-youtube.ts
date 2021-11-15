import {apiHandler, youTubeGetID} from "../../helpers/api/api-handler";
import {NextApiRequest, NextApiResponse} from "next";
import getConfig from "next/config";
import axios from "axios";
import {Video} from "../../helpers/interfaces";
import moment from "moment";
import {createVideo, findVideo} from "../../data/video-repo";
import {findUserById} from "../../data/user-repo";

const jwt = require('jsonwebtoken');

const {publicRuntimeConfig} = getConfig();

async function shareYoutube(req: NextApiRequest, res: NextApiResponse) {
    const jwtDecode = jwt.decode(String(req.headers.authorization).replace('Bearer ', ''));
    const user = await findUserById(jwtDecode.sub);
    if (user) {
        // split out password from user details
        const {youtubeUrl} = req.body;
        const youtubeId = youTubeGetID(youtubeUrl);
        if (youtubeId) {
            // Check if this youtubeId exists
            const findExist = await findVideo(youtubeId);
            if (findExist) {
                return res.status(200).json({
                    success: false
                });
            }
            const data = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${youtubeId}&fields=items/snippet/title,items/snippet/description,items/statistics&key=${publicRuntimeConfig.youtubeDataApiKey}`, {
                responseType: 'json'
            });
            if (data.status === 200) {
                if (data.data.hasOwnProperty('items') && Array.isArray(data.data.items) && data.data.items.length > 0) {
                    const doc: Video = {
                        id: youtubeId,
                        url: youtubeUrl,
                        createdAt: moment.utc().toDate(),
                        title: data.data.items[0]?.snippet?.title,
                        description: data.data.items[0]?.snippet?.description,
                        viewCount: data.data.items[0]?.statistics?.viewCount,
                        likeCount: data.data.items[0]?.statistics?.likeCount,
                        dislikeCount: data.data.items[0]?.statistics?.dislikeCount,
                        favoriteCount: data.data.items[0]?.statistics?.favoriteCount,
                        commentCount: data.data.items[0]?.statistics?.commentCount,
                        shareBy: user.username
                    };

                    // Save into database
                    await createVideo(doc);

                    return res.status(201).json({
                        success: true
                    });
                }
            } else {
                return res.status(200).json({
                    success: false
                });
            }
        }
    }
    return res.status(200).json({
        success: false
    });
}

export default apiHandler({
    post: shareYoutube
});