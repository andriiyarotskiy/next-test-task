import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {Button, CardActions, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import Link from "next/link";
import {PostType, RequestStatusType} from "../api/api";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {deletePostTC} from "../store/mainReducer";


const PostCard = ({title, body, id}: PostType<{}>) => {
    const classes = useStyles();

    const progress = useSelector<AppRootStateType, RequestStatusType>(state => state.main.progress)
    const dispatch = useDispatch()
    const sliceLongText = (str: string) => {
        if (str.length > 12) {
            return str.slice(0, 12) + ' ...'
        } else {
            return str
        }
    }
    const deletePostHandler = (id) => {
        dispatch(deletePostTC(id))
    }


    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title={`${title}`}
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title && sliceLongText(title)}
                    </Typography>

                    <Typography>
                        {body && body.length > 20
                            ? body.slice(0, 20) + ' ...' :
                            body}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link href={"/posts[postId]"} as={`/posts/${id}`}>
                        <Button size="small" variant="contained" color="primary">
                            View
                        </Button>
                    </Link>
                    <Button
                        disabled={(progress === "loading")}
                        onClick={() => deletePostHandler(id)}
                        variant="contained"
                        size="small" color="secondary">
                        Remove
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )

};

export default PostCard;


// Material UI styles
const useStyles = makeStyles(() => ({
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
}));