/* Contratos de funcionalidades, autocompletes e verificações de erro */
export interface Post {
    id: number
    title: string
    body: string
    tags: string[]
    reactions: Reactions
    views: number
    userId: number
    image: string
    comments: Comment[]
}

export interface CreatePostInput {
    title: string
    body: string
}

export interface Reactions {
    likes: number
    dislikes: number
}

export interface Comment {
    id: number
    body: string
    postId: number
    likes: number
    dislikes: number
    user: CommentUser
}

export interface CommentUser {
    id: number
    username: string
    fullName: string
    image: string
}

export interface PostsResponse {
    posts: ApiPost[]
    total: number
    skip: number
    limit: number
}

export interface CommentsResponse {
    comments: ApiComment[]
    total: number
    skip: number
    limit: number
}

export type ApiPost = Omit<Post, 'image' | 'comments'>

export interface ApiComment extends Omit<Comment, 'dislikes' | 'user'> {
    user: Omit<CommentUser, 'image'>
}
