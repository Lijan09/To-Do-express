export interface IUser {
    name: string;
    password: string;
    userName: string;
}

export interface IUserName {
    userName: string;
}

export interface IAuth {
    userName: string;
    password: string;
}

export interface IUpdateName {
    oldName: string;
    newName: string;
}

export interface IAuthResponse {
    userName: string;
    message: string;
}

export interface IProfile {
    name: string;
    userName: string;
}
