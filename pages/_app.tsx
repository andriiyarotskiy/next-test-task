import {wrapper} from "../store/store";
import React from "react";
import {AppProps} from "next/app";

const MyApp = ({Component, pageProps}: AppProps) => {
    return (
        <Component {...pageProps} />
    )
}

//withRedux wrapper that passes the store to the App Component
export default wrapper.withRedux(MyApp);