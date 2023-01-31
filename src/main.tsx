import React, {useMemo, useState} from 'react'
import ReactDOM from 'react-dom/client'
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Login from "./Login";
import {AuthContext, UpdateAuthContext} from "./authContext";
import Cookies from "universal-cookie";
import App from "./App/App";
import Sheet from "./App/Sheet";

const router = createBrowserRouter([
                                       {
                                           path: "/",
                                           element: <Login/>,
                                       },
                                       {
                                           path: "/sheets",
                                           element: <App/>
                                       },
                                       {
                                           path: "/sheets/:id",
                                           element: <Sheet/>
                                       }
                                   ]);

function getInitialJWT() {
    const cookies = new Cookies
    const c = cookies.get('ath')
    return (c as string) || ''
}

function Holder() {
    const [jwt, setJwt] = useState(getInitialJWT)
    const client = useMemo(() => new ApolloClient({
                                                      uri: 'http://localhost:4000/',
                                                      cache: new InMemoryCache(),
                                                      headers: {Authorization: jwt},
                                                  }),
                           [jwt]);

    return <AuthContext.Provider value={jwt}>
        <UpdateAuthContext.Provider value={setJwt}>
            <ApolloProvider client={client}>
                <RouterProvider router={router}/>
            </ApolloProvider>
        </UpdateAuthContext.Provider>
    </AuthContext.Provider>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
        .render(<React.StrictMode>
            <Holder/>
        </React.StrictMode>,)
