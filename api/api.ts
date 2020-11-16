import axios from 'axios';

// https://simple-blog-api.crew.red/

const instance = axios.create({
    baseURL: "https://simple-blog-api.crew.red/",
})

export const API = {
    getAllPosts() {
        return instance.get("posts");
    },
    getPost(id: number) {
        return instance.get(`posts/${id}?_embed=comments`);
    }
}