This App sets up a minimalistic time tracker application. You can add sheets and the app tracks time for each of them. App consits of multiple hooks including one for login.This application uses Vite , Typescript, React, Apollo Client for GraphQL queries, and Material-UI for the user interface components. Below is a brief overview of the code:

Libraries and Dependencies:

React is imported for creating React components.
ReactDOM is imported for rendering React components into the DOM.
ApolloClient, ApolloProvider, and InMemoryCache are imported from @apollo/client for making GraphQL queries.
createBrowserRouter, RouterProvider are imported from react-router-dom for setting up the application routing.
AuthContext and UpdateAuthContext are context providers for managing authentication state.
Cookies is imported from universal-cookie for handling cookies.
ThemeProvider, CssBaseline, and createTheme are imported from @mui/material for theming the application.
Routes:

The application has three routes defined:
Root path (/) renders the Login component.
/sheets path renders the App component.
/sheets/:id path renders the Sheet component.
Initial JWT Token:

getInitialJWT function retrieves the initial JWT token from cookies using the universal-cookie library.
Holder Component:

The Holder component is the root component of the application.
It initializes the Apollo Client with the retrieved JWT token and sets up the application theme based on the user's color scheme preference.
The component provides authentication context and routing context to its child components.
Root Rendering:

The ReactDOM.createRoot function is used to render the Holder component into the DOM element with the id 'root'.

