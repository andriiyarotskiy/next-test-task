import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deletePostTC, fetchPostsTC} from "../store/mainReducer";
import {AppRootStateType} from "../store/store";
import Link from "next/link";
import {PostType} from "./posts/[postId]";
import Router from "next/router";
import BlogWrapper from "../components/BlogWrapper";

import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const Index = () => {

    const classes = useStyles(); // Material styles

    const posts = useSelector<AppRootStateType, any>(state => state.main.posts)
    const dispatch = useDispatch()


    console.log(posts.length)

    useEffect(() => {
        dispatch(fetchPostsTC())
    }, [dispatch])

    const deletePost = (id) => {
        dispatch(deletePostTC(id))
    }

    return (
        <BlogWrapper>
            {/* Hero unit */}
            <div>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Posts
                    </Typography>

                    <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
                        Example how i first wrote code on next.js.
                    </Typography>

                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {posts.map((post: PostType) => (
                        <Grid item key={post.id} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image="https://source.unsplash.com/random"
                                    title={`${post.title}`}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {post.title}
                                    </Typography>
                                    <Typography>
                                        {post.body.length > 50 ? post.body.slice(0, 50) + ' ...' : post.body}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link href={"/posts[postId]"} as={`/posts/${post.id}`}>
                                        <Button size="small" variant="contained" color="primary">
                                            View
                                        </Button>
                                    </Link>
                                    <Button size="small" color="primary">
                                        Edit
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </BlogWrapper>

    )
}
export default Index;

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

/*<BlogWrapper>
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
</BlogWrapper>*/
