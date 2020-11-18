import {API} from "../api/api";
import {AppRootStateType} from "./store";
import {Dispatch} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {getUserPostTC} from "./postReducer";

type InitialStateType = typeof initialState


export type ActionsTypes = ReturnType<typeof setPosts>
    | ReturnType<typeof createPost>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof updatePost>


let initialState = {
    posts: [],
}

const mainReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'GET-ALL-POSTS': {
            return {...state, posts: action.data}
        }
        case 'CREATE-POST': {
            return {...state, posts: [...state.posts, action.newPost]}
        }
        case 'DELETE-POST': {
            return {...state, posts: state.posts.filter(p => p.id !== action.id)}
        }
        case 'UPDATE-POST': {
            return {...state, posts: state.posts.map(p => p.id === action.id ? action.body : p)}
        }
        default :
            return state
    }
}

export const setPosts = (data) => ({
    type: 'GET-ALL-POSTS', data
}) as const

export const createPost = (newPost) => ({
    type: 'CREATE-POST', newPost
}) as const
export const deletePost = (id) => ({
    type: 'DELETE-POST', id
}) as const
export const updatePost = (id, body) => ({
    type: 'UPDATE-POST', id, body
}) as const

//Thunk
export const fetchPostsTC = () => async (dispatch: Dispatch) => {
    try {
        const posts = await API.getAllPosts()
        dispatch(setPosts(posts))
    } catch (e) {
    }
}

export const createPostTC = (newPost) => async (dispatch: Dispatch) => {
    try {
        const response = await API.createPost(newPost)
        if (response){
            dispatch(createPost(newPost))
        }
    } catch (e) {
    }
}


export const deletePostTC = (id: number): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsTypes>) => {
    try {
        const response = await API.deletePost(id)
        if (response){
            dispatch(deletePost(id))
        }
        await dispatch(fetchPostsTC())
    } catch (e) {
    }
}

export const updatePostTC = (id: string, body: {body: string, title: string}): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsTypes>) => {
    try {
        const response = await API.updatePost(id, body)
        dispatch(updatePost(id, response.data))
        await dispatch(getUserPostTC(id))
        await dispatch(fetchPostsTC())
    } catch (e) {
    }
}
// Thunk Types
type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsTypes>
export default mainReducer;