import {PostUser} from "@/models/user";

export class Post {
    public id: string;
    public userId: string;
    public user: PostUser;
    public postedAt: number;
    public content: string;
    public comments: Array<Post>;
    public likes: Array<string>;

    constructor(post: any) {
        this.id = post.id || Date.now();
        this.userId = post.userId || "";
        this.user = new PostUser(post.user || {});
        this.postedAt = post.postedAt || Date.now();
        this.content = post.content || "";
        this.comments = post.comments || [];
        this.likes = post.likes || [];
    }

}