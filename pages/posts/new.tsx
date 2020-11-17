import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {createPostTC} from "../../store/mainReducer";
import BlogWrapper from "../../components/BlogWrapper";
import {Button, Input, TextField} from "@material-ui/core";
import styled from "styled-components";

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

const NewPost = () => {

    const dispatch = useDispatch()
    const [value, setValue] = useState({
        title: '',
        body: ''
    })
    const createPostClickHandler = () => {
        dispatch(createPostTC(value))
    }

    const onChangeInput = (e) => {
        setValue({...value, title: e.currentTarget.value})
    }
    const onChangeTextArea = (e) => {
        setValue({...value, body: e.currentTarget.value})
    }

    return (
        <BlogWrapper>
            <Container>
                <h1>CREATE POST!</h1>
                <div>
                    <Input placeholder="Title" value={value.title} onChange={onChangeInput}/>
                </div>
                <div>
                    <TextFieldStyle
                        id="outlined-multiline-static"
                        label="Multiline"
                        multiline
                        rows={4}
                        defaultValue="Default Value"
                        variant="outlined"
                        value={value.body}
                        onChange={onChangeTextArea}
                    />
                </div>
                {/*<textarea value={value.body} onChange={onChangeTextArea}/>*/}
                <ButtonStyle variant={'contained'} color={"primary"}
                             onClick={createPostClickHandler}>create</ButtonStyle>
            </Container>
        </BlogWrapper>
    )
}

export default NewPost;