import {useDispatch} from "react-redux";
import React, {ChangeEvent, useCallback, useState} from "react";
import {createPostTC} from "../../store/mainReducer";
import BlogWrapper from "../../components/BlogWrapper";
import styled from "styled-components";
import {Input, TextField, Button} from "@material-ui/core";


const NewPost = React.memo(() => {

    const dispatch = useDispatch()
    const [value, setValue] = useState({
        title: '',
        body: ''
    })
    const createPostClickHandler = useCallback(() => {//
        dispatch(createPostTC(value))
    }, [value])


    const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue({...value, [event.target.name]: event.target.value})
    }

    return (
        <BlogWrapper>
            <Container>
                <h1>CREATE POST!</h1>
                <div>
                    <Input placeholder="Title"
                           name="title"
                           value={value.title} onChange={onChangeHandler}/>
                </div>
                <div>
                    <TextFieldStyle
                        name="body"
                        id="outlined-multiline-static"
                        label="Multiline"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={value.body}
                        onChange={onChangeHandler}
                    />
                </div>
                <ButtonStyle variant={'contained'} color={"primary"}
                             onClick={createPostClickHandler}>create</ButtonStyle>
            </Container>
        </BlogWrapper>
    )
})

export default NewPost;


const Container = styled.div`
    width: 100%;
    height: calc(100vh - 64px);
    display: flex;
    flex-direction: column;
    text-align: center;
`
const TextFieldStyle = styled(TextField)`
    margin-top: 30px;
    width: 500px;
    @media (max-width: 600px){
        width: 300px;
        padding: 0 15px 0 15px;
       }
      && textarea {
       max-width: 100%;
       min-height: 100px;
}   

`
const ButtonStyle = styled(Button)`
  && {
    width: 300px;
    height: 30px;
    margin: 30px auto;
  }
`;