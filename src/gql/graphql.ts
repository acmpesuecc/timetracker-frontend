/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum EventType {
  End = 'End',
  Start = 'Start'
}

export type IRecord = {
  event?: InputMaybe<EventType>;
  time: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateAccount?: Maybe<Scalars['Boolean']>;
  Delete?: Maybe<Scalars['Boolean']>;
  Edit?: Maybe<Scalars['Boolean']>;
  Login?: Maybe<Scalars['String']>;
  Punch?: Maybe<Scalars['ID']>;
  Sheet?: Maybe<Scalars['ID']>;
};


export type MutationCreateAccountArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationDeleteArgs = {
  itemId: Scalars['ID'];
};


export type MutationEditArgs = {
  itemId: Scalars['ID'];
  record?: InputMaybe<IRecord>;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationPunchArgs = {
  sheetId: Scalars['ID'];
};


export type MutationSheetArgs = {
  Month: Scalars['Int'];
  Year: Scalars['Int'];
  sheetName: Scalars['String'];
};

export type NRecord = {
  __typename?: 'NRecord';
  event: EventType;
  id: Scalars['ID'];
  time: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  Sheet?: Maybe<SheetInfo>;
  Sheets?: Maybe<Array<Sheet>>;
};


export type QuerySheetArgs = {
  sheetId: Scalars['ID'];
};

export type Sheet = {
  __typename?: 'Sheet';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type SheetInfo = {
  __typename?: 'SheetInfo';
  hasEnded: Scalars['Boolean'];
  records?: Maybe<Array<Maybe<NRecord>>>;
  summary?: Maybe<Sheet>;
  total: Scalars['Int'];
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', Login?: string | null };

export type SheetsQueryVariables = Exact<{ [key: string]: never; }>;


export type SheetsQuery = { __typename?: 'Query', Sheets?: Array<{ __typename?: 'Sheet', id: string, name: string }> | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SheetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Sheets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Sheets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<SheetsQuery, SheetsQueryVariables>;