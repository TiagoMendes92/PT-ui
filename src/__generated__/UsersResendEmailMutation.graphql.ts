/**
 * @generated SignedSource<<7ed00d85ee5f842b03364fb90c44ed1e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UsersResendEmailMutation$variables = {
  userId: string;
};
export type UsersResendEmailMutation$data = {
  readonly resendRegistrationEmail: {
    readonly success: boolean;
  };
};
export type UsersResendEmailMutation = {
  response: UsersResendEmailMutation$data;
  variables: UsersResendEmailMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "userId",
        "variableName": "userId"
      }
    ],
    "concreteType": "ResendEmailResult",
    "kind": "LinkedField",
    "name": "resendRegistrationEmail",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UsersResendEmailMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UsersResendEmailMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4310867427e071f75f8d6e68a594a8a3",
    "id": null,
    "metadata": {},
    "name": "UsersResendEmailMutation",
    "operationKind": "mutation",
    "text": "mutation UsersResendEmailMutation(\n  $userId: ID!\n) {\n  resendRegistrationEmail(userId: $userId) {\n    success\n  }\n}\n"
  }
};
})();

(node as any).hash = "c9f9e997ae7404f98f992ed5eaa58eab";

export default node;
