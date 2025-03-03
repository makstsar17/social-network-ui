export type User = {
    id: string,
    email: string,
    name: string,
    avatarUrl: string,
    dateOfBirth?: Date | null,
    createdAt: Date,
    updatedAt?: Date | null,
    bio?: string | null,
    location?: string | null,
    posts: string[],
    followers: string[],
    following: string[],
    isFollowing?: boolean,
}

export type UserRegister = {
    name: string,
    email: string,
    password: string
}

export type UserLogin = {
    email: string,
    password: string
}

export type LoginResult = {
    token: string
} 