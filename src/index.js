import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home} from "./components/Home";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {AuthCallback} from "./components/AuthCallback";
const client = new ApolloClient({
    uri: 'http://localhost:3002/graphql',
    cache: new InMemoryCache()
})


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/kakao/callback",
        element: <AuthCallback/>
    }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client} >
    <RouterProvider router={router}/>
    </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
