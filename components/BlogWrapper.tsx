import Link from "next/link";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import React, {ReactChild, ReactChildren} from "react";
import {AppBar, Button, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography} from "@material-ui/core";


interface AuxProps {
    children: ReactChild | ReactChildren;
}

const BlogWrapper = ({children}: AuxProps): JSX.Element => {

    const classes = useStyles();
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Link href={"/"}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <LocalLibraryIcon fontSize={"large"}/>
                        </IconButton>
                    </Link>
                    <Typography variant="h6" className={classes.title}>
                        <Link href={"/"}><Button color="inherit">Home</Button></Link>
                    </Typography>

                    <Link href={"/posts/new"}>
                        <Button color="inherit" variant={"outlined"}>Create new post</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <main>
                {children}
            </main>
        </>
    )
}

export default BlogWrapper;


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);