import React, {ChangeEvent, useState} from 'react';
import {Box, Button, TextField} from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import {PostBody, PostContainer, PostTitle, WriteIcon} from "../pages/posts/[postId]";

import styled from "styled-components";


type EditableSpanPropsType = {
    title: string
    onChange: (newPost: { title: string, body: string }) => void
    body: string
}



const EditableSpan = React.memo(({title, body, ...props}: EditableSpanPropsType) => {


    let [editMode, setEditMode] = useState(false);
    let [value, setValue] = useState({title, body});


    const activateEditMode = () => {
        setEditMode(true);
        setValue({title, body});
    }
    const activateViewMode = () => {
        if (value.title?.trim()) { // &&
            props.onChange(value)
        } else {
            setValue({title, body});
        }
        setEditMode(false);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({...value, title: e.currentTarget.value})
    }
    const changeBody = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({...value, body: e.currentTarget.value})
    }
    return (
        <>
            <PostContainer>
                {editMode
                    ? <TextFielStyled value={value.title} onChange={changeTitle}/>
                    : <PostTitle>{title}</PostTitle>}
                <WriteIcon onClick={activateEditMode}>
                    <EditIcon/>
                </WriteIcon>
                {editMode
                    ? <TextFielStyled value={value.body} onChange={changeBody}/>
                    : <PostBody>{body}</PostBody>}
                {editMode && <Box mt={2}>
                    <Button variant={"contained"}
                            color={"primary"}
                            size={"small"}
                            onClick={activateViewMode}>Save</Button>
                </Box>}
            </PostContainer>
        </>
    )
})
EditableSpan.displayName = 'EditableSpan';

export default EditableSpan;

// Styled Components
const TextFielStyled = styled(TextField)`
  && input{
      color: white;
      border-bottom: white; 
  }
`