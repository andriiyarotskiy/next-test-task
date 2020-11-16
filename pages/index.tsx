import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deletePostTC, fetchPostsTC} from "../store/mainReducer";
import {AppRootStateType} from "../store/store";
import Link from "next/link";
import {PostType} from "./posts/[postId]";
import Router from "next/router";
import BlogWrapper from "../components/BlogWrapper";


const Index = () => {

    const posts = useSelector<AppRootStateType, any>(state => state.main.posts)
    const dispatch = useDispatch()

    const [count, setCount] = useState(0);

    console.log(posts.length)

    useEffect(() => {
        dispatch(fetchPostsTC())
    }, [dispatch])

    const deletePost = (id) => {
        dispatch(deletePostTC(id))
    }

    return (
        <BlogWrapper>
            <h1>Main</h1>
            <button onClick={() => Router.push('/posts/new')}>Create post</button>
            {posts.map((post: PostType) => {
                return <div key={post.id}>
                    <Link href={"/posts[postId]"} as={`/posts/${post.id}`}>
                        <a>{post.title}</a>
                    </Link>
                    <button onClick={() => deletePost(post.id)}>X</button>
                </div>
            })}
        </BlogWrapper>
    )
}
export default Index;
