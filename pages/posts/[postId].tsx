import {NextRouter, useRouter} from "next/router";
import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserPostTC} from "../../store/postReducer";
import {AppRootStateType} from "../../store/store";
import BlogWrapper from "../../components/BlogWrapper";
import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import styled from "styled-components";
import EditableSpan from "../../components/EditableSpan";
import {updatePostTC} from "../../store/mainReducer";
import {CommentsType, PostType} from "../../api/api";


const Post = React.memo(() => {

    const classes = useStyles();

    const router: NextRouter = useRouter()
    const post = useSelector<AppRootStateType, PostType<CommentsType>>(state => state.post.post)
    const dispatch = useDispatch()

    // router ID
    const postId = router.query.postId

    useEffect(() => {
        postId && dispatch(getUserPostTC(postId))
    }, [postId])

    const changePost = useCallback((body) => {
        const id = postId.toString()
        dispatch(updatePostTC(id, body))
    }, [postId])

    return (
        <BlogWrapper>
            <>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                >
                    <Container>
                        <UserAvatar>A</UserAvatar>
                            <EditableSpan title={post.title} body={post.body} onChange={changePost}/>
                    </Container>
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
            </>
        </BlogWrapper>
    )
})

Post.displayName = 'Post';
export default Post;

// Styled Components
export const Container = styled.div`
  position:relative;
  min-width: 400px;
  color: white;
  display: flex;
  align-items: flex-start;
  margin: 50px auto 30px auto;
  padding: 15px;
  height: 100%;
  background: #2b2f36;
  border-radius: 5px;
  @media (max-width: 600px) {
  min-width: 200px;
    width: 100%;
  }
`
export const WriteIcon = styled.div`
    right: 10px;
    top: 10px;
    position: absolute;
    cursor: pointer;
`
export const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 350px;
    margin-left: 15px;
     @media (max-width: 600px) {
    width: 100%;
  }
`
export const UserAvatar = styled(Avatar)`
  background: white;
  color:#2b2f36;
  font-weight: bold;
`
export const PostTitle = styled.div`
    font-size: 20px;
    text-transform: uppercase;
    font-weight: bold;
`
export const PostBody = styled.div`
    font-size: 15px;
`


// Material UI
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
