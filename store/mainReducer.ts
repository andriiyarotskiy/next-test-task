import {Dispatch} from "redux";
import {API} from "../api/api";

type InitialStateType = typeof initialState
export type ActionsTypes = ReturnType<typeof setPosts>

let initialState = {
    posts: []
}

const mainReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'GET-ALL-POSTS': {
            return {...state, posts: action.data}
        }

        default :
            return state
    }
}

export const setPosts = (data) => ({
    type: 'GET-ALL-POSTS', data
})

//Thunk
export const fetchPostsTC = () => async (dispatch: Dispatch) => {
    try {
        const response = await API.getAllPosts()
        dispatch(setPosts(response.data))
    } catch (e) {
    }
}


export default mainReducer;