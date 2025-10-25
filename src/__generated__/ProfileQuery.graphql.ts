/**
 * @generated SignedSource<<7ea3dcf9db1093fc83e2efdc315eca88>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ProfileQuery$variables = {
  user_id: string;
};
export type ProfileQuery$data = {
  readonly userDetails: {
    readonly birthday: string | null | undefined;
    readonly height: number | null | undefined;
    readonly id: string;
    readonly photographyKey: string | null | undefined;
    readonly photographyUrl: string | null | undefined;
    readonly sex: string | null | undefined;
    readonly weight: number | null | undefined;
  } | null | undefined;
};
export type ProfileQuery = {
  response: ProfileQuery$data;
  variables: ProfileQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "user_id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "user_id",
        "variableName": "user_id"
      }
    ],
    "concreteType": "AlunoDetails",
    "kind": "LinkedField",
    "name": "userDetails",
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
        "name": "birthday",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "height",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "weight",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "sex",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "photographyUrl",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "photographyKey",
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
    "name": "ProfileQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "57ea0956d933196c2e56513d29b475cc",
    "id": null,
    "metadata": {},
    "name": "ProfileQuery",
    "operationKind": "query",
    "text": "query ProfileQuery(\n  $user_id: ID!\n) {\n  userDetails(user_id: $user_id) {\n    id\n    birthday\n    height\n    weight\n    sex\n    photographyUrl\n    photographyKey\n  }\n}\n"
  }
};
})();

(node as any).hash = "43af4805b29c9f2b42c9b51378d2e6c0";

export default node;
