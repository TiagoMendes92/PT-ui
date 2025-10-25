/**
 * @generated SignedSource<<f4960a8b51a89fc7f41a716069ba7108>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UserStatus = "ACTIVE" | "ARCHIVED" | "DEACTIVATED" | "PENDING" | "%future added value";
export type AdminUserInputWithId = {
  email: string;
  id: string;
  name: string;
};
export type UsersEditMutation$variables = {
  user: AdminUserInputWithId;
};
export type UsersEditMutation$data = {
  readonly editUser: {
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
export type UsersEditMutation = {
  response: UsersEditMutation$data;
  variables: UsersEditMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "user"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "user",
        "variableName": "user"
      }
    ],
    "concreteType": "AdminUser",
    "kind": "LinkedField",
    "name": "editUser",
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
    "name": "UsersEditMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UsersEditMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "65098a6c1d19962d8a47e7ddeca22b00",
    "id": null,
    "metadata": {},
    "name": "UsersEditMutation",
    "operationKind": "mutation",
    "text": "mutation UsersEditMutation(\n  $user: AdminUserInputWithId!\n) {\n  editUser(user: $user) {\n    id\n    email\n    name\n    status\n    createdAt\n    updatedAt\n    deactivatedAt\n    passwordSetAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "927061a48b31968acead8800f6ff57b9";

export default node;
