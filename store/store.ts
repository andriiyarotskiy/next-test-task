import postReducer from "./postReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {createWrapper, MakeStore} from "next-redux-wrapper";
import mainReducer from "./mainReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    main: mainReducer,
    post: postReducer,
})

const makeStore: MakeStore<AppRootStateType> = () => createStore(rootReducer, applyMiddleware(thunk));

// debug for console.log
export const wrapper = createWrapper<AppRootStateType>(makeStore);

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>