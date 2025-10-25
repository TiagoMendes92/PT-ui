/**
 * @generated SignedSource<<c5303b35f1bd6641834b72116e8ca62e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CategoryInput = {
  name: string;
  parent_category?: string | null | undefined;
};
export type CategoriesCreateMutation$variables = {
  cat: CategoryInput;
};
export type CategoriesCreateMutation$data = {
  readonly addCategory: {
    readonly id: string;
  } | null | undefined;
};
export type CategoriesCreateMutation = {
  response: CategoriesCreateMutation$data;
  variables: CategoriesCreateMutation$variables;
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
    "name": "addCategory",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "CategoriesCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CategoriesCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1130699d39ec1bfc1d1e96803370e080",
    "id": null,
    "metadata": {},
    "name": "CategoriesCreateMutation",
    "operationKind": "mutation",
    "text": "mutation CategoriesCreateMutation(\n  $cat: CategoryInput!\n) {\n  addCategory(cat: $cat) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "1122b95d6b7cf17d623f544bffb670c0";

export default node;
