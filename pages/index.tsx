import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deletePostTC, fetchPostsTC} from "../store/mainReducer";
import {AppRootStateType} from "../store/store";
import Link from "next/link";
import BlogWrapper from "../components/BlogWrapper";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {PostType} from "../api/api";


const Blog = () => {
    const classes = useStyles();

    const posts = useSelector<AppRootStateType, Array<PostType<{}>>>(state => state.main.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPostsTC())
    }, [dispatch])


    const deletePost = (id) => {
        dispatch(deletePostTC(id))
    }
    // Slice Long Text in card
    const sliceLongText = (str: string) => {
        if (str.length > 12) {
            return str.slice(0, 12) + ' ...'
        } else {
            return str
        }
    }

    return (
        <BlogWrapper>
            <>
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
                        {posts && posts.map((post) => (
                            <Grid item key={post.id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title={`${post.title}`}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {post.title && sliceLongText(post.title)}
                                        </Typography>

                                        <Typography>
                                            {post.body && post.body.length > 20
                                                ? post.body.slice(0, 20) + ' ...' :
                                                post.body}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link href={"/posts[postId]"} as={`/posts/${post.id}`}>
                                            <Button size="small" variant="contained" color="primary">
                                                View
                                            </Button>
                                        </Link>
                                        <Button onClick={() => deletePost(post.id)}
                                                variant="contained"
                                                size="small" color="secondary">
                                            Remove
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
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
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));
