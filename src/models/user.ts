export class User {
    public id: string;
    public firstName: string;
    public middleName: string;
    public lastName: string;
    public mobile: string;
    public email: string;
    public registeredAt: number;
    public lastLogin: number;
    public intro: string;
    public profile: string;
    public userId: string;
    public createdAt: string;
    public updatedAt: string;
    public currentProgramId: string;
    public schedule: any;
    public profilePic: string;
    public followers: string[];
    public following: string[];

    constructor(user: any) {
        this.id = user.id || "";
        this.firstName = user.firstName || "";
        this.middleName = user.middleName || "";
        this.lastName = user.lastName || "";
        this.mobile = user.mobile || "";
        this.email = user.email || "";
        this.registeredAt = user.registeredAt || Date.now();
        this.lastLogin = user.lastLogin || Date.now();
        this.intro = user.intro || "";
        this.profile = user.profile || "";
        this.userId = user.userId || "";
        this.createdAt = user.createdAt || "";
        this.updatedAt = user.updatedAt || "";
        this.currentProgramId = user.currentProgramId || "";
        this.schedule = user.schedule || [];
        this.profilePic = user.profilePic || "";
        this.followers = user.followers || [];
        this.following = user.following || [];
    }

    public getUserName() {
        if (this.middleName.length < 1) {
            return `${this.firstName} ${this.lastName}`
        } else {
            return `${this.firstName} ${this.middleName} ${this.lastName}`
        }
    }

}

export class PostUser {
    public userId: string;
    public firstName: string;
    public middleName: string;
    public lastName: string;
    public profilePic: string;

    constructor(user: any) {
        this.userId = user.userId || "";
        this.firstName = user.firstName || "";
        this.middleName = user.middleName || "";
        this.lastName = user.lastName || "";
        this.profilePic = user.profilePic || "";
    }

    public getUserName() {
        if (this.middleName.length < 1) {
            return `${this.firstName} ${this.lastName}`
        } else {
            return `${this.firstName} ${this.middleName} ${this.lastName}`
        }
    }
}