/**
 * @generated SignedSource<<3a2bc88f8770aa7811bdce6f99cf1913>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CategoriesDeleteMutation$variables = {
  id: string;
};
export type CategoriesDeleteMutation$data = {
  readonly deleteCategory: string | null | undefined;
};
export type CategoriesDeleteMutation = {
  response: CategoriesDeleteMutation$data;
  variables: CategoriesDeleteMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "kind": "ScalarField",
    "name": "deleteCategory",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CategoriesDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CategoriesDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6a6a73461c65988ca1c2cba92f1aa90d",
    "id": null,
    "metadata": {},
    "name": "CategoriesDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation CategoriesDeleteMutation(\n  $id: String!\n) {\n  deleteCategory(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "4f02ea982e1dfd22f40f8f186b6154c9";

export default node;
