/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query getTodos {\n    allTodos {\n      id\n      text\n      completed\n    }\n  }\n": types.GetTodosDocument,
    "\n  mutation removeTodo($id: String!) {\n    removeTodo(id: $id) {\n      id\n    }\n  }\n": types.RemoveTodoDocument,
    "\n  mutation createTodo($text: String!) {\n    createTodo(text: $text) {\n      id\n      text\n      completed\n    }\n  }\n": types.CreateTodoDocument,
    "\n                fragment NewTodo on Todo {\n                  id\n                  text\n                  completed\n                }\n              ": types.NewTodoFragmentDoc,
    "\n  mutation toggleTodo($id: String!, $completed: Boolean!) {\n    toggleTodo(id: $id, completed: $completed) {\n      id\n      completed\n    }\n  }\n": types.ToggleTodoDocument,
};

export function graphql(source: "\n  query getTodos {\n    allTodos {\n      id\n      text\n      completed\n    }\n  }\n"): (typeof documents)["\n  query getTodos {\n    allTodos {\n      id\n      text\n      completed\n    }\n  }\n"];
export function graphql(source: "\n  mutation removeTodo($id: String!) {\n    removeTodo(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation removeTodo($id: String!) {\n    removeTodo(id: $id) {\n      id\n    }\n  }\n"];
export function graphql(source: "\n  mutation createTodo($text: String!) {\n    createTodo(text: $text) {\n      id\n      text\n      completed\n    }\n  }\n"): (typeof documents)["\n  mutation createTodo($text: String!) {\n    createTodo(text: $text) {\n      id\n      text\n      completed\n    }\n  }\n"];
export function graphql(source: "\n                fragment NewTodo on Todo {\n                  id\n                  text\n                  completed\n                }\n              "): (typeof documents)["\n                fragment NewTodo on Todo {\n                  id\n                  text\n                  completed\n                }\n              "];
export function graphql(source: "\n  mutation toggleTodo($id: String!, $completed: Boolean!) {\n    toggleTodo(id: $id, completed: $completed) {\n      id\n      completed\n    }\n  }\n"): (typeof documents)["\n  mutation toggleTodo($id: String!, $completed: Boolean!) {\n    toggleTodo(id: $id, completed: $completed) {\n      id\n      completed\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;