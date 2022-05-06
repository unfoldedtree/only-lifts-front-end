export class Post {
    public id: string;
    public postDate: number;
    public content: string;
    public comments: Array<Post>;
    public likes: Array<string>;

    constructor(post: any) {
        this.id = post.id || Date.now();
        this.postDate = post.postDate || Date.now();
        this.content = post.content || "";
        this.comments = [];
        this.likes = [];
    }

}