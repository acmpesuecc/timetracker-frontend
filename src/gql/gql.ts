/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  mutation Login($username: String!, $password: String!) {\n    Login(username: $username, password: $password)\n  }\n": types.LoginDocument,
    "\n  query Sheets {\n    Sheets {\n      id\n      name\n    }\n  }\n": types.SheetsDocument,
    "\n  query getSheetInfo($sheetId: ID!) {\n    Sheet(sheetId: $sheetId) {\n      summary {\n        name\n        id\n      }\n      records {\n        event\n        id\n        time\n      }\n      hasEnded\n      total\n    }\n  }\n": types.GetSheetInfoDocument,
    "\n  mutation Punch($sheetId: ID!) {\n    Punch(sheetId: $sheetId)\n  }\n": types.PunchDocument,
    "\n  mutation CreateSheet($sheetName: String!, $month: Int!, $year: Int!) {\n    Sheet(sheetName: $sheetName, Month: $month, Year: $year)\n  }\n": types.CreateSheetDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($username: String!, $password: String!) {\n    Login(username: $username, password: $password)\n  }\n"): (typeof documents)["\n  mutation Login($username: String!, $password: String!) {\n    Login(username: $username, password: $password)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Sheets {\n    Sheets {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query Sheets {\n    Sheets {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getSheetInfo($sheetId: ID!) {\n    Sheet(sheetId: $sheetId) {\n      summary {\n        name\n        id\n      }\n      records {\n        event\n        id\n        time\n      }\n      hasEnded\n      total\n    }\n  }\n"): (typeof documents)["\n  query getSheetInfo($sheetId: ID!) {\n    Sheet(sheetId: $sheetId) {\n      summary {\n        name\n        id\n      }\n      records {\n        event\n        id\n        time\n      }\n      hasEnded\n      total\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Punch($sheetId: ID!) {\n    Punch(sheetId: $sheetId)\n  }\n"): (typeof documents)["\n  mutation Punch($sheetId: ID!) {\n    Punch(sheetId: $sheetId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateSheet($sheetName: String!, $month: Int!, $year: Int!) {\n    Sheet(sheetName: $sheetName, Month: $month, Year: $year)\n  }\n"): (typeof documents)["\n  mutation CreateSheet($sheetName: String!, $month: Int!, $year: Int!) {\n    Sheet(sheetName: $sheetName, Month: $month, Year: $year)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;