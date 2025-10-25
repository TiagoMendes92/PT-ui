/**
 * @generated SignedSource<<bf681ee65904b0e02fa56cfc76bfff54>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UserStatus = "ACTIVE" | "ARCHIVED" | "DEACTIVATED" | "PENDING" | "%future added value";
export type UsersDeactivateMutation$variables = {
  id: string;
};
export type UsersDeactivateMutation$data = {
  readonly deactivateUser: {
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
export type UsersDeactivateMutation = {
  response: UsersDeactivateMutation$data;
  variables: UsersDeactivateMutation$variables;
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
    "name": "deactivateUser",
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
    "name": "UsersDeactivateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UsersDeactivateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e163f460ba40e229308d233c2d6d0aa1",
    "id": null,
    "metadata": {},
    "name": "UsersDeactivateMutation",
    "operationKind": "mutation",
    "text": "mutation UsersDeactivateMutation(\n  $id: String!\n) {\n  deactivateUser(id: $id) {\n    id\n    email\n    name\n    status\n    createdAt\n    updatedAt\n    deactivatedAt\n    passwordSetAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "b6f6db42d8c54caae1883998d9093940";

export default node;
