import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPostsTC} from "../store/mainReducer";
import {AppRootStateType} from "../store/store";
import BlogWrapper from "../components/BlogWrapper";
import {Box, Container, Grid, LinearProgress, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {PostType, RequestStatusType} from "../api/api";
import PostCard from "../components/PostCard";


const Blog = () => {
    const classes = useStyles();

    const posts = useSelector<AppRootStateType, Array<PostType<{}>>>(state => state.main.posts)
    const progress = useSelector<AppRootStateType, RequestStatusType>(state => state.main.progress)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPostsTC())
    }, [dispatch])


    // Slice Long Text in card

    return (
        <BlogWrapper>
            <>
                {progress === "loading" && <LinearProgress/>}
                <div>
                    <Container maxWidth="sm">
                        <Box mt={5}>
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Posts
                            </Typography>
                        </Box>
                        <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
                            Example how i first wrote code on next.js.
                        </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {posts && posts.map((post, i) => {
                            return <PostCard key={i} title={post.title} id={post.id} body={post.body}/>
                        })}
                    </Grid>
                </Container>
            </>
        </BlogWrapper>
    )
}
export default Blog;


// Material UI styles
const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
}));
