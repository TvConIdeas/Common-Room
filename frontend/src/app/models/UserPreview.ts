import { Role } from "./User"

export default interface UserPreview {
    id: number
    username: string
    profilePictureUrl?: string
    role: Role
}