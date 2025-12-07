/**
 * @generated SignedSource<<6658bab248d23d346d74e84731b3ab54>>
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
  file?: any | null | undefined;
};
export type CategoriesEditMutation$data = {
  readonly editCategory: {
    readonly id: string;
    readonly name: string;
    readonly parentCategory: string | null | undefined;
    readonly photo: {
      readonly key: string;
      readonly url: string;
    } | null | undefined;
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
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Photo",
        "kind": "LinkedField",
        "name": "photo",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "url",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "key",
            "storageKey": null
          }
        ],
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
    "cacheID": "4691b634c1a2f9f437b4d7d1cde8161e",
    "id": null,
    "metadata": {},
    "name": "CategoriesEditMutation",
    "operationKind": "mutation",
    "text": "mutation CategoriesEditMutation(\n  $cat: CategoryInputWithId!\n  $file: Upload\n) {\n  editCategory(cat: $cat, file: $file) {\n    id\n    name\n    parentCategory\n    updatedAt\n    photo {\n      url\n      key\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "87d2952d530a7cddee27c5a34012607b";

export default node;
