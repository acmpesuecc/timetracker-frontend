/*
 * This software has been written with the idea of building a minimalistic time tracker.
 * Copyright (c) 2023.  Samarth Ramesh
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import { AuthContext, UpdateAuthContext } from "./authContext";
import Cookies from "universal-cookie";
import App from "./App/App";
import Sheet from "./App/Sheet";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { AuthCheck } from "./App/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/sheets",
    element: <App />,
  },
  {
    path: "/sheets/:id",
    element: (
      <AuthCheck>
        <Sheet />
      </AuthCheck>
    ),
  },
]);

function getInitialJWT() {
  const cookies = new Cookies();
  const c = cookies.get("ath");
  return (c as string) || "";
}

function Holder() {
  const [jwt, setJwt] = useState(getInitialJWT);
  const appoloOptins = {
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
    headers: { Authorization: jwt },
  };
  const client = useMemo(() => new ApolloClient(appoloOptins), [jwt]);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode],
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContext.Provider value={jwt}>
        <UpdateAuthContext.Provider value={setJwt}>
          <ApolloProvider client={client}>
            <RouterProvider router={router} />
          </ApolloProvider>
        </UpdateAuthContext.Provider>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Holder />
  </React.StrictMode>,
);
