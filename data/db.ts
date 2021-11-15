import {fileURLToPath} from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const usersDbFile = path.join(__dirname, 'users.json');
export const videosDbFile = path.join(__dirname, 'videos.json');