import {graphql} from "../gql";

export const LOGIN = graphql(/* GraphQL */ `
    mutation Login($username: String!, $password: String!) {
        Login(username: $username, password: $password)
    }
`)