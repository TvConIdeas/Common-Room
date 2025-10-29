import { Review } from "./Review";
import { Token } from "./Token";

export interface User {
    id: number;
    username: string;
    password?: string;
    email: string;
    description?: string;
    role: Role;
    createdAt: string;
    profilePictureUrl?: string;

    tokens?: Token[];
    reviews?: Review[];
}

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}
