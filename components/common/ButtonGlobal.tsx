import {Button} from "@material-ui/core";
import React from "react";
import Post from "../../pages/posts/[postId]";


type ButtonGlobalType = {
    title: string
    onClick: () => void
    isdisabled: boolean
}

const ButtonGlobal = React.memo(({title, onClick, isdisabled}: ButtonGlobalType) => {
    return <Button onClick={onClick}
                   disabled={isdisabled}
                   variant={"contained"} color={"secondary"}>{title}</Button>
})
ButtonGlobal.displayName = 'ButtonGlobal';

export default ButtonGlobal;