import {NextApiRequest, NextApiResponse} from "next";
import {apiHandler} from "../../helpers/api/api-handler";
import {listVideos} from "../../data/video-repo";

async function videos(req: NextApiRequest, res: NextApiResponse) {
    const videos = await listVideos();
    return res.status(200).json(videos);
}

export default apiHandler({
    get: videos
});