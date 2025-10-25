/**
 * @generated SignedSource<<45d899fbf6b4dad1ad1d4184f73cb9d7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ExerciseInput = {
  category: string;
  name: string;
  url: string;
};
export type ExerciseCreateMutation$variables = {
  connections: ReadonlyArray<string>;
  exercise: ExerciseInput;
};
export type ExerciseCreateMutation$data = {
  readonly addExercise: {
    readonly category: string;
    readonly createdAt: string;
    readonly id: string;
    readonly name: string;
    readonly updatedAt: string;
    readonly url: string;
  } | null | undefined;
};
export type ExerciseCreateMutation = {
  response: ExerciseCreateMutation$data;
  variables: ExerciseCreateMutation$variables;
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
  "name": "exercise"
},
v2 = [
  {
    "kind": "Variable",
    "name": "exercise",
    "variableName": "exercise"
  }
],
v3 = {
  "alias": null,
  "args": (v2/*: any*/),
  "concreteType": "Exercise",
  "kind": "LinkedField",
  "name": "addExercise",
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
      "name": "url",
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
      "name": "category",
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
    "name": "ExerciseCreateMutation",
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
    "name": "ExerciseCreateMutation",
    "selections": [
      (v3/*: any*/),
      {
        "alias": null,
        "args": (v2/*: any*/),
        "filters": null,
        "handle": "prependNode",
        "key": "",
        "kind": "LinkedHandle",
        "name": "addExercise",
        "handleArgs": [
          {
            "kind": "Variable",
            "name": "connections",
            "variableName": "connections"
          },
          {
            "kind": "Literal",
            "name": "edgeTypeName",
            "value": "ExerciseEdge"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "e38018d99b4a9af98d3d39f3f82ca5df",
    "id": null,
    "metadata": {},
    "name": "ExerciseCreateMutation",
    "operationKind": "mutation",
    "text": "mutation ExerciseCreateMutation(\n  $exercise: ExerciseInput!\n) {\n  addExercise(exercise: $exercise) {\n    id\n    url\n    name\n    category\n    createdAt\n    updatedAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "360f4e243bbc7506837a8fcc7d32513b";

export default node;
