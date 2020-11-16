import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPostsTC} from "../store/mainReducer";
import {AppRootStateType} from "../store/store";
import Link from "next/link";
import {PostType} from "./post/[postId]";


const Index = () => {

    const posts = useSelector<AppRootStateType, any>(state => state.main.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPostsTC())
    }, [])

    console.log(posts)
    return (
        <>
            <h1>Main</h1>
            {posts.map((post: PostType) => {
                return <div key={post.id}>
                    <Link href={"/post[postId]"} as={`/post/${post.id}`}>
                        <a>{post.title}</a>
                    </Link>
                </div>
            })}
        </>
    )
}
export default Index;


{/*<nav>*/
}
{/*    <Link href={'/'}><a>Home</a></Link>*/
}
{/*    <Link href={'/posts'}><a>Posts</a></Link>*/
}
{/*    <Link href={'/posts/:postId'}><a>PostId</a></Link>*/
}
{/*</nav>*/
}