import Link from "next/link";
import Toolbar from "@material-ui/core/Toolbar";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {CssBaseline} from "@material-ui/core";

const BlogWrapper = ({children}) => {
    return (
        <>
            <CssBaseline/>
            <AppBar position="relative">
                <Toolbar>
                    <Link href={"/"}>
                        <LocalLibraryIcon cursor={'pointer'}/>
                    </Link>
                    <Link href={"/posts/new"}>
                        <Typography style={{cursor: "pointer", marginLeft: "16px"}} variant="h6" color="inherit" noWrap>
                            Write new post
                        </Typography>
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


// <>
//     <nav>
//         <Link href={"/"}><a>Main Page</a></Link>
//         <Link href={"/posts/new"}><a>Create new Post</a></Link>
//     </nav>
//     <main>
//         {children}
//     </main>
// </>