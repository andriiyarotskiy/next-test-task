import {wrapper} from "../store/store";
import React from "react";
import {AppProps} from "next/app";
import {Normalize} from "styled-normalize";

const MyApp = ({Component, pageProps}: AppProps) => {

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    return (
        <>
            <Normalize />
            <Component {...pageProps} />
        </>
    )
}

//withRedux wrapper that passes the store to the App Component
export default wrapper.withRedux(MyApp);