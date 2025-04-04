export type User = {
    id: string,
    email: string,
    name: string,
    avatarUrl: string,
    dateOfBirth?: Date,
    createdAt: Date,
    updatedAt?: Date,
    bio?: string,
    location?: string,
    posts: string[],
    followers: string[],
    following: string[],
    isFollowing: boolean,
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

export type Post = {
    id: string,
    content: string,
    user: {
        id: string,
        email: string,
        name: string,
        avatarUrl: string
    },
    likes: string[],
    comments: string[],
    createdAt: Date,
    likedByUser: boolean
}

export type CreatePost = {
    content: string
}

export type ID = {
    id: string
}

export type Comment = {
    id: string
    content: string,
    postId: string,
    user: {
        id: string,
        email: string,
        name: string,
        avatarUrl: string
    },
}

export type CreateComment = {
    content: string,
    postId: string
}

export type UpdateUser = {
    email: string,
    name: string,
    dateOfBirth: Date,
    bio: string,
    location: string,
    avatar: File
}