import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {createPostTC} from "../../store/mainReducer";
import Router from "next/router";
import BlogWrapper from "../../components/BlogWrapper";

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
            <h1>CREATE POST!</h1>
            <div>
                <input value={value.title} onChange={onChangeInput}/>
            </div>
            <div>
                <textarea value={value.body} onChange={onChangeTextArea}/>
            </div>
            <button onClick={createPostClickHandler}>create</button>
            <div>
                <button onClick={() => Router.push('/')}>Back to main</button>
            </div>
        </BlogWrapper>
    )
}

export default NewPost;