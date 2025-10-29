import { User } from "./User";

export interface Token {
    id: number;
    token: string;
    tokenType: TokenType;      // Enum equivalente
    revoked: boolean;
    expired: boolean;
    user: User;
}

export enum TokenType {
    BEARER = 'BEARER'
}
