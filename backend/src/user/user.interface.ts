export enum UserType{
    Admin,
    User,
    RestaurantManager
}


export interface RegisterInterface{
    username: string;
    password: string;
    type:UserType
}

export interface LoginInterface{
    username: string;
    password: string;
}

export interface TokenInterface{
    token: string;
}


export interface UserInterface{
    id: number;
    username: string;
    password: string;
    type:UserType
}