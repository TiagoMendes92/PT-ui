/**
 * @generated SignedSource<<adafe7460bb6a987c691a6bdbdd410af>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CategoryInputWithId = {
  id: string;
  name: string;
  parent_category?: string | null | undefined;
};
export type CategoriesEditMutation$variables = {
  cat: CategoryInputWithId;
};
export type CategoriesEditMutation$data = {
  readonly editCategory: {
    readonly id: string;
    readonly name: string;
    readonly parentCategory: string | null | undefined;
    readonly updatedAt: string;
  } | null | undefined;
};
export type CategoriesEditMutation = {
  response: CategoriesEditMutation$data;
  variables: CategoriesEditMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cat"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "cat",
        "variableName": "cat"
      }
    ],
    "concreteType": "Category",
    "kind": "LinkedField",
    "name": "editCategory",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "parentCategory",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "updatedAt",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CategoriesEditMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CategoriesEditMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8ab1c10386c8ffb5c31f4942370d54d6",
    "id": null,
    "metadata": {},
    "name": "CategoriesEditMutation",
    "operationKind": "mutation",
    "text": "mutation CategoriesEditMutation(\n  $cat: CategoryInputWithId!\n) {\n  editCategory(cat: $cat) {\n    id\n    name\n    parentCategory\n    updatedAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "e7f865cd4669965fb39c206b95881f20";

export default node;
