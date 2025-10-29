import { User } from "./User";

export interface Review {
    id: number;
    rating: number;
    comment?: string;
    createdAt: string;
    movieId: number;
    user: User;
}
