import {NextRouter, useRouter} from "next/router";
import Link from "next/link";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserPostTC} from "../../store/postsReducer";
import {AppRootStateType} from "../../store/store";


export type PostType = {
    title: string
    body: string
    id: number
}

const Post = React.memo(() => {
    const router: NextRouter = useRouter()
    const post = useSelector<AppRootStateType, any>(state => state.posts.post)
    const dispatch = useDispatch()

    // router ID
    const postId = router.query.postId

    useEffect(() => {
        postId && dispatch(getUserPostTC(postId))
    }, [postId, dispatch])

    console.log(post)
    return (
        <>
            <h2>{post.title}</h2>
            <h3>{post.body}</h3>
            <div>
                {post.comments && post.comments.map(comment => <div key={comment.id}>{comment.body}</div>)}
            </div>
        </>
    )
})

export default Post;