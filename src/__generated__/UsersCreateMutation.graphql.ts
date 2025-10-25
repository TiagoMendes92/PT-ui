/**
 * @generated SignedSource<<09f6e298ce30fcd8e9637e6ed69a9fef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UserStatus = "ACTIVE" | "ARCHIVED" | "DEACTIVATED" | "PENDING" | "%future added value";
export type AdminUserInput = {
  email: string;
  name: string;
};
export type UsersCreateMutation$variables = {
  connections: ReadonlyArray<string>;
  user: AdminUserInput;
};
export type UsersCreateMutation$data = {
  readonly addUser: {
    readonly createdAt: string;
    readonly deactivatedAt: string | null | undefined;
    readonly email: string;
    readonly id: string;
    readonly name: string;
    readonly passwordSetAt: string | null | undefined;
    readonly status: UserStatus;
    readonly updatedAt: string | null | undefined;
  } | null | undefined;
};
export type UsersCreateMutation = {
  response: UsersCreateMutation$data;
  variables: UsersCreateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "user"
},
v2 = [
  {
    "kind": "Variable",
    "name": "user",
    "variableName": "user"
  }
],
v3 = {
  "alias": null,
  "args": (v2/*: any*/),
  "concreteType": "AdminUser",
  "kind": "LinkedField",
  "name": "addUser",
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
      "name": "email",
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
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
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
      "kind": "ScalarField",
      "name": "deactivatedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "passwordSetAt",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UsersCreateMutation",
    "selections": [
      (v3/*: any*/)
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "UsersCreateMutation",
    "selections": [
      (v3/*: any*/),
      {
        "alias": null,
        "args": (v2/*: any*/),
        "filters": null,
        "handle": "prependNode",
        "key": "",
        "kind": "LinkedHandle",
        "name": "addUser",
        "handleArgs": [
          {
            "kind": "Variable",
            "name": "connections",
            "variableName": "connections"
          },
          {
            "kind": "Literal",
            "name": "edgeTypeName",
            "value": "AdminUserEdge"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "3359edf34148daac72b94ccc62347761",
    "id": null,
    "metadata": {},
    "name": "UsersCreateMutation",
    "operationKind": "mutation",
    "text": "mutation UsersCreateMutation(\n  $user: AdminUserInput!\n) {\n  addUser(user: $user) {\n    id\n    email\n    name\n    status\n    createdAt\n    updatedAt\n    deactivatedAt\n    passwordSetAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "057282c126dc8d9b1fb254aadcc2fc58";

export default node;
