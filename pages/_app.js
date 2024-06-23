import App from 'next/app';
import '../styles/app.css';
import { useState } from 'react';

export default function MyApp({ Component, pageProps }) {
    
    const siteTitle = process.env.siteTitle
    const props = {
        ...pageProps
    }

    return (
        <div>
            <Component { ...props } />
        </div>
    )
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);
    return {
        ...appProps
    }
}