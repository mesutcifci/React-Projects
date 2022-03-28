export interface Post{
    id: string,
    owner: string,
    title: string,
    body: string,
    createdAt: string,
    updatedAt: string
}

export interface Posts {
    posts: Post[],
    post: Post,
    userPosts: Post[]
}