/**
 * @generated SignedSource<<676b404c08ad7d1281e3a676d066608e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type RegisterPageMutation$variables = {
  password: string;
  token: string;
};
export type RegisterPageMutation$data = {
  readonly setPassword: {
    readonly success: boolean;
  };
};
export type RegisterPageMutation = {
  response: RegisterPageMutation$data;
  variables: RegisterPageMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "password"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "token"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password"
      },
      {
        "kind": "Variable",
        "name": "token",
        "variableName": "token"
      }
    ],
    "concreteType": "SetPasswordResult",
    "kind": "LinkedField",
    "name": "setPassword",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "success",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RegisterPageMutation",
    "selections": (v2/*: any*/),
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
    "name": "RegisterPageMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "bf7e34db17de1e492dc2afdd68aeb44b",
    "id": null,
    "metadata": {},
    "name": "RegisterPageMutation",
    "operationKind": "mutation",
    "text": "mutation RegisterPageMutation(\n  $token: String!\n  $password: String!\n) {\n  setPassword(token: $token, password: $password) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "7fd7b6bdd952d577506a16c42920c1aa";

export default node;
