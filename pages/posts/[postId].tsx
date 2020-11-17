import {NextRouter, useRouter} from "next/router";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserPostTC} from "../../store/postsReducer";
import {AppRootStateType} from "../../store/store";
import BlogWrapper from "../../components/BlogWrapper";


import Paper from '@material-ui/core/Paper';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            overflow: 'hidden',
            padding: theme.spacing(0, 3),
        },
        paper: {
            maxWidth: 400,
            margin: `${theme.spacing(1)}px auto`,
            padding: theme.spacing(2),
        },
    }),
);

export type PostType = {
    title: string
    body: string
    id: number
}

const Post = React.memo(() => {
    const classes = useStyles();

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
        <BlogWrapper>
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
            >

                <Paper className={classes.paper}>
                    <Grid container zeroMinWidth wrap="nowrap" spacing={2}>
                            <Avatar>W</Avatar>
                        <Grid item xs zeroMinWidth>
                            <Typography noWrap>{post.title}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
                              {/*  <Typography gutterBottom variant="h5" component="h2">
                                    {post.title}
                                </Typography>*/}
                {post.comments && post.comments.map(comment => {
                    return <div key={comment.id} className={classes.root}>
                        <Paper className={classes.paper}>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item xs zeroMinWidth>
                                    {comment.body}
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                })}
            </Grid>
        </BlogWrapper>
    )
})

export default Post;

// <h2>{post.title}</h2>
// <h3>{post.body}</h3>
// <div>
//     {post.comments && post.comments.map(comment => <div key={comment.id}>{comment.body}</div>)}
// </div>