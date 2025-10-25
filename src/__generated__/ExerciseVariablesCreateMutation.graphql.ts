/**
 * @generated SignedSource<<7db745f51c6ca7d6219c1ac9c5acae76>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ExerciseVariableInput = {
  description?: string | null | undefined;
  name: string;
  unit: string;
};
export type ExerciseVariablesCreateMutation$variables = {
  connections: ReadonlyArray<string>;
  variable: ExerciseVariableInput;
};
export type ExerciseVariablesCreateMutation$data = {
  readonly addExerciseVariable: {
    readonly createdAt: string;
    readonly description: string | null | undefined;
    readonly id: string;
    readonly name: string;
    readonly unit: string | null | undefined;
    readonly updatedAt: string;
  } | null | undefined;
};
export type ExerciseVariablesCreateMutation = {
  response: ExerciseVariablesCreateMutation$data;
  variables: ExerciseVariablesCreateMutation$variables;
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
  "name": "variable"
},
v2 = [
  {
    "kind": "Variable",
    "name": "variable",
    "variableName": "variable"
  }
],
v3 = {
  "alias": null,
  "args": (v2/*: any*/),
  "concreteType": "ExerciseVariable",
  "kind": "LinkedField",
  "name": "addExerciseVariable",
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
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ExerciseVariablesCreateMutation",
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
    "name": "ExerciseVariablesCreateMutation",
    "selections": [
      (v3/*: any*/),
      {
        "alias": null,
        "args": (v2/*: any*/),
        "filters": null,
        "handle": "prependNode",
        "key": "",
        "kind": "LinkedHandle",
        "name": "addExerciseVariable",
        "handleArgs": [
          {
            "kind": "Variable",
            "name": "connections",
            "variableName": "connections"
          },
          {
            "kind": "Literal",
            "name": "edgeTypeName",
            "value": "ExerciseVariableEdge"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "749573b0b98a1b66c45a09f09b364fc9",
    "id": null,
    "metadata": {},
    "name": "ExerciseVariablesCreateMutation",
    "operationKind": "mutation",
    "text": "mutation ExerciseVariablesCreateMutation(\n  $variable: ExerciseVariableInput!\n) {\n  addExerciseVariable(variable: $variable) {\n    id\n    name\n    unit\n    createdAt\n    updatedAt\n    description\n  }\n}\n"
  }
};
})();

(node as any).hash = "4790e49bd6cd336dc3568e394df243bd";

export default node;
