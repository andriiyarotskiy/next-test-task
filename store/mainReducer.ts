import {Dispatch} from "redux";
import {API} from "../api/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "./store";

type InitialStateType = typeof initialState
export type ActionsTypes = ReturnType<typeof setPosts>
    | ReturnType<typeof createPost>
    | ReturnType<typeof deletePost>


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

//Thunk
export const fetchPostsTC = () => async (dispatch: Dispatch) => {
    try {
        const response = await API.getAllPosts()
        dispatch(setPosts(response.data))
    } catch (e) {
    }
}

export const createPostTC = (newPost) => async (dispatch: Dispatch) => {
    try {
        const response = await API.createPost(newPost)
        dispatch(createPost(response.data))
    } catch (e) {
    }
}
type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsTypes>

export const deletePostTC = (id): ThunkType => async (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsTypes>) => {
    try {
        const response = await API.deletePost(id)
        dispatch(deletePost(response.data))
        await dispatch(fetchPostsTC())
    } catch (e) {
    }
}

export default mainReducer;