import axios from 'axios';

const instance = axios.create({
    baseURL: "https://simple-blog-api.crew.red/",
})

export const API = {
    getAllPosts() {
        return instance.get<Array<PostType<{}>>>("posts").then(r => r.data); //.then(r => r.data)
    },
    getPost(id: number) {
        return instance.get<PostType<CommentsType>>(`posts/${id}?_embed=comments`).then(r => r.data);
    },
    createPost(newPost: PostType<{}>) {
        return instance.post<PostType<{}>>(`posts`, newPost).then(r => r.data);
    },
    deletePost(id: number) {
        return instance.delete<{}>(`posts/${id}`).then(r => r.data);
    },
    updatePost(id, body) {
        return instance.put<PostType<{}>>(`posts/${id}`, body);
    },
}

//Types
export type CommentsType = {
    postId: number
    body: string
    id: number
}

export type PostType<T> = {
    title: string
    body: string
    id: number
    comments?: Array<T>
}

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"