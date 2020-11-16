import {wrapper} from "../store/store";
import React from "react";

const MyApp = ({Component, pageProps}) => {
    return (
        <Component {...pageProps} />
    )
}

//makeStore function that returns a new store for every request

//withRedux wrapper that passes the store to the App Component
export default wrapper.withRedux(MyApp);