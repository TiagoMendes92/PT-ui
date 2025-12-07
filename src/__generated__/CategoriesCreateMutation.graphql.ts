/**
 * @generated SignedSource<<4561c83cca0110d6103945c9af9199ea>>
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
  file?: any | null | undefined;
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "file"
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
      },
      {
        "kind": "Variable",
        "name": "file",
        "variableName": "file"
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
    "cacheID": "fc2a6e7fba05d3d4f56de0b1726bb1cb",
    "id": null,
    "metadata": {},
    "name": "CategoriesCreateMutation",
    "operationKind": "mutation",
    "text": "mutation CategoriesCreateMutation(\n  $cat: CategoryInput!\n  $file: Upload\n) {\n  addCategory(cat: $cat, file: $file) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "cc3b8e318a7e2e757039bd7244357a4f";

export default node;
