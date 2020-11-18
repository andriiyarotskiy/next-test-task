import {API, CommentsType, PostType} from "../api/api";
import {Dispatch} from "redux";

type InitialStateType = typeof initialState
export type ActionsTypes = ReturnType<typeof setUserPost>

let initialState = {
    post: {} as PostType<CommentsType>
}

const postReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SET-USER-POST': {
            return {...state, post: action.post}
        }
        default :
            return state
    }
}

export const setUserPost = (post: PostType<CommentsType>) => ({
    type: 'SET-USER-POST', post
})

//Thunk
export const getUserPostTC = (id: string | string[]) => async (dispatch: Dispatch) => {
    const postId = Number(id)
    try {
        const post = await API.getPost(postId)
        dispatch(setUserPost(post))
    } catch (e) {
    }
}


export default postReducer;