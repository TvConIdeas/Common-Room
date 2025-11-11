import { UserBase } from "./UserBase";

export interface User extends UserBase{
    id: number;
    description?: string;
    role: Role;
    createdAt: string;
    profilePictureUrl?: string;
}

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}
