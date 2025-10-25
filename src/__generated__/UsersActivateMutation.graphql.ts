/**
 * @generated SignedSource<<929dda55e913836dbd03b92b7f739423>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UserStatus = "ACTIVE" | "ARCHIVED" | "DEACTIVATED" | "PENDING" | "%future added value";
export type UsersActivateMutation$variables = {
  id: string;
};
export type UsersActivateMutation$data = {
  readonly activateUser: {
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
export type UsersActivateMutation = {
  response: UsersActivateMutation$data;
  variables: UsersActivateMutation$variables;
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
    "concreteType": "AdminUser",
    "kind": "LinkedField",
    "name": "activateUser",
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UsersActivateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UsersActivateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "db5d1109408cf5f7a56331060f772846",
    "id": null,
    "metadata": {},
    "name": "UsersActivateMutation",
    "operationKind": "mutation",
    "text": "mutation UsersActivateMutation(\n  $id: String!\n) {\n  activateUser(id: $id) {\n    id\n    email\n    name\n    status\n    createdAt\n    updatedAt\n    deactivatedAt\n    passwordSetAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "1c322f8ac93c6f2f09d892efe06dcc92";

export default node;
