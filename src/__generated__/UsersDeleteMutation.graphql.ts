/**
 * @generated SignedSource<<cf5841a448d6574de0352e3a1cb2e534>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UsersDeleteMutation$variables = {
  id: string;
};
export type UsersDeleteMutation$data = {
  readonly deleteUser: string | null | undefined;
};
export type UsersDeleteMutation = {
  response: UsersDeleteMutation$data;
  variables: UsersDeleteMutation$variables;
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": (v1/*: any*/),
  "kind": "ScalarField",
  "name": "deleteUser",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UsersDeleteMutation",
    "selections": [
      (v2/*: any*/)
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UsersDeleteMutation",
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "deleteRecord",
        "key": "",
        "kind": "ScalarHandle",
        "name": "deleteUser"
      }
    ]
  },
  "params": {
    "cacheID": "a19254a1f6a809254646a76b9c8ad64f",
    "id": null,
    "metadata": {},
    "name": "UsersDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation UsersDeleteMutation(\n  $id: String!\n) {\n  deleteUser(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "7da338adb7d76281142339ccab4b78cd";

export default node;
