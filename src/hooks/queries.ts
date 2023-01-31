import {graphql} from "../gql";

export const LOGIN = graphql(/* GraphQL */ `
    mutation Login($username: String!, $password: String!) {
        Login(username: $username, password: $password)
    }
                             `)

export const GET_SHEETS = graphql(/* GraphQL */ `
    query Sheets{
        Sheets {
            id,
            name
        }
    }`)

export const GET_SHEET_INFO = graphql(/* GraphQL */ `query getSheetInfo($sheetId: ID!) {
    Sheet(sheetId: $sheetId) {
        summary {
            name,
            id
        }
        records {
            event,
            id,
            time
        }
        hasEnded
        total
    }
}`)
