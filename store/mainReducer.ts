import {API, PostType, RequestStatusType} from "../api/api";
import {AppRootStateType} from "./store";
import {Dispatch} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {getUserPostTC} from "./postReducer";

type InitialStateType = typeof initialState


export type ActionsTypes = ReturnType<typeof setPosts>
    | ReturnType<typeof createPost>
    | ReturnType<typeof deletePostAC>
    | ReturnType<typeof updatePost>
    | ReturnType<typeof setStatusProgress>


let initialState = {
    posts: [],
    progress: "idle" as RequestStatusType,
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
        case "SET-STATUS-PROGRESS": {
            return {...state, progress: action.progress}
        }
        default :
            return state
    }
}

//AC
export const setPosts = (data) => ({
    type: 'GET-ALL-POSTS', data
}) as const

export const createPost = (newPost: PostType<{}>) => ({
    type: 'CREATE-POST', newPost
}) as const
export const deletePostAC = (id: number) => ({
    type: 'DELETE-POST', id
}) as const
export const updatePost = (id: number, body: PostType<{}>) => ({
    type: 'UPDATE-POST', id, body
}) as const
export const setStatusProgress = (progress) => ({
    type: 'SET-STATUS-PROGRESS', progress
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
        if (response) {
            dispatch(createPost(newPost))
        }
    } catch (e) {
    }
}


export const deletePostTC = (id: number): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsTypes>) => {
    dispatch(setStatusProgress('loading'))
    try {
        const response = await API.deletePost(id)
        if (response) {
            dispatch(deletePostAC(id))
            dispatch(setStatusProgress('succeeded'))
        }
        await dispatch(fetchPostsTC())
    } catch (e) {
        dispatch(setStatusProgress('failed'))
    } finally {
        dispatch(setStatusProgress('idle'))
    }
}

export const updatePostTC = (id: string, body: { body: string, title: string }): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsTypes>) => {
    const postId = +id
    try {
        const response = await API.updatePost(id, body)
        dispatch(updatePost(postId, response.data))
        await dispatch(getUserPostTC(id))
        await dispatch(fetchPostsTC())
    } catch (e) {
    }
}
// Thunk Types
type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsTypes>
export default mainReducer;