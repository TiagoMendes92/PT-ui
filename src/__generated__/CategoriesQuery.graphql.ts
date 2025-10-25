/**
 * @generated SignedSource<<3fd8c1a863806c0956bdda0385b64dba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CategoriesQuery$variables = Record<PropertyKey, never>;
export type CategoriesQuery$data = {
  readonly categories: ReadonlyArray<{
    readonly createdAt: string;
    readonly id: string;
    readonly name: string;
    readonly parentCategory: string | null | undefined;
    readonly subcategories: ReadonlyArray<{
      readonly createdAt: string;
      readonly id: string;
      readonly name: string;
      readonly parentCategory: string | null | undefined;
      readonly updatedAt: string;
    }>;
    readonly updatedAt: string;
  }>;
};
export type CategoriesQuery = {
  response: CategoriesQuery$data;
  variables: CategoriesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "parentCategory",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Category",
    "kind": "LinkedField",
    "name": "categories",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Category",
        "kind": "LinkedField",
        "name": "subcategories",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CategoriesQuery",
    "selections": (v5/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CategoriesQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "5765c85fa8e7e518e024d3d11a3e67c1",
    "id": null,
    "metadata": {},
    "name": "CategoriesQuery",
    "operationKind": "query",
    "text": "query CategoriesQuery {\n  categories {\n    id\n    name\n    createdAt\n    updatedAt\n    parentCategory\n    subcategories {\n      id\n      name\n      createdAt\n      updatedAt\n      parentCategory\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c68845a9074a10c0f412d2ab8183d557";

export default node;
