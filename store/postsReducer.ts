import {Dispatch} from "redux";
import {API} from "../api/api";

type InitialStateType = typeof initialState
export type ActionsTypes = ReturnType<typeof setUserPost>

let initialState = {
    post: {}
}

const postsReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SET-USER-POST': {
            return {...state, post: action.post}
        }
        default :
            return state
    }
}

export const setUserPost = (post) => ({
    type: 'SET-USER-POST', post
})

//Thunk
export const getUserPostTC = (id: string | string[]) => async (dispatch: Dispatch) => {
    try {
        const postId = Number(id)
        const response = await API.getPost(postId)
        dispatch(setUserPost(response.data))
    } catch (e) {
    }
}


export default postsReducer;