/**
 * @generated SignedSource<<c37be4e7ee4dd10886656b91b2a7b5d6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ProfileMutation$variables = {
  birthday?: string | null | undefined;
  height?: number | null | undefined;
  sex?: string | null | undefined;
  weight?: number | null | undefined;
};
export type ProfileMutation$data = {
  readonly updateUserDetails: {
    readonly birthday: string | null | undefined;
    readonly height: number | null | undefined;
    readonly id: string;
    readonly sex: string | null | undefined;
    readonly weight: number | null | undefined;
  };
};
export type ProfileMutation = {
  response: ProfileMutation$data;
  variables: ProfileMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "birthday"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "height"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sex"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "weight"
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "birthday",
        "variableName": "birthday"
      },
      {
        "kind": "Variable",
        "name": "height",
        "variableName": "height"
      },
      {
        "kind": "Variable",
        "name": "sex",
        "variableName": "sex"
      },
      {
        "kind": "Variable",
        "name": "weight",
        "variableName": "weight"
      }
    ],
    "concreteType": "AlunoDetails",
    "kind": "LinkedField",
    "name": "updateUserDetails",
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
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProfileMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "ProfileMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "c8b9711c6de41f989b7e5a6b02473527",
    "id": null,
    "metadata": {},
    "name": "ProfileMutation",
    "operationKind": "mutation",
    "text": "mutation ProfileMutation(\n  $birthday: String\n  $height: Int\n  $weight: Int\n  $sex: String\n) {\n  updateUserDetails(birthday: $birthday, height: $height, weight: $weight, sex: $sex) {\n    id\n    birthday\n    height\n    weight\n    sex\n  }\n}\n"
  }
};
})();

(node as any).hash = "38c7c41ddafc25c10ee8034605f8f44d";

export default node;
