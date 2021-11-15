export interface User {
    id?: string;
    username: string;
    password: string;
    createdAt: Date;
}

export interface Video {
    id: string;
    url: string;
    createdAt: Date;
    title: string;
    description?: string;
    viewCount?: string | number;
    likeCount?: string | number;
    dislikeCount?: string | number;
    favoriteCount?: string | number;
    commentCount?: string | number;
    shareBy: string;
}