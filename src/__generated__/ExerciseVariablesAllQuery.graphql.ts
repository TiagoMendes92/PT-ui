/**
 * @generated SignedSource<<e07b025e285da71fb40fedc7d64fd309>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ExerciseVariablesAllQuery$variables = Record<PropertyKey, never>;
export type ExerciseVariablesAllQuery$data = {
  readonly allVariables: ReadonlyArray<{
    readonly createdAt: string;
    readonly description: string | null | undefined;
    readonly id: string;
    readonly name: string;
    readonly unit: string | null | undefined;
    readonly updatedAt: string;
  }>;
};
export type ExerciseVariablesAllQuery = {
  response: ExerciseVariablesAllQuery$data;
  variables: ExerciseVariablesAllQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ExerciseVariable",
    "kind": "LinkedField",
    "name": "allVariables",
    "plural": true,
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
        "name": "unit",
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
        "name": "description",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ExerciseVariablesAllQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ExerciseVariablesAllQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "1a53b07e7eba0baf32a11a22c9470e06",
    "id": null,
    "metadata": {},
    "name": "ExerciseVariablesAllQuery",
    "operationKind": "query",
    "text": "query ExerciseVariablesAllQuery {\n  allVariables {\n    id\n    name\n    unit\n    createdAt\n    updatedAt\n    description\n  }\n}\n"
  }
};
})();

(node as any).hash = "359e500f9228219d8204ed1d79d55ad9";

export default node;
