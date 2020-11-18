import Document, {Head, Html, Main, NextScript} from 'next/document'
import React from "react";
import {ServerStyleSheets} from "@material-ui/styles";
import MyApp from "./_app";

class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: MyApp => props => sheet.collect(<MyApp {...props}/>)
            });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            }
        } finally {
            ctx.renderPage(sheet)
        }
    }


    render() {
        return (
            <Html>
                <Head><title>Andrii Yarotskiy | ^_^</title></Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument