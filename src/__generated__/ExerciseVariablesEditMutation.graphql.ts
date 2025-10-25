/**
 * @generated SignedSource<<7c623d31d8e7b1bfd334767e51e1030a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ExerciseVariableInputWithId = {
  description?: string | null | undefined;
  id: string;
  name: string;
  unit: string;
};
export type ExerciseVariablesEditMutation$variables = {
  variable: ExerciseVariableInputWithId;
};
export type ExerciseVariablesEditMutation$data = {
  readonly editExerciseVariable: {
    readonly createdAt: string;
    readonly description: string | null | undefined;
    readonly id: string;
    readonly name: string;
    readonly unit: string | null | undefined;
    readonly updatedAt: string;
  } | null | undefined;
};
export type ExerciseVariablesEditMutation = {
  response: ExerciseVariablesEditMutation$data;
  variables: ExerciseVariablesEditMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "variable"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "variable",
        "variableName": "variable"
      }
    ],
    "concreteType": "ExerciseVariable",
    "kind": "LinkedField",
    "name": "editExerciseVariable",
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ExerciseVariablesEditMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ExerciseVariablesEditMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3a6d12048a3845792129aca2c074e6c6",
    "id": null,
    "metadata": {},
    "name": "ExerciseVariablesEditMutation",
    "operationKind": "mutation",
    "text": "mutation ExerciseVariablesEditMutation(\n  $variable: ExerciseVariableInputWithId!\n) {\n  editExerciseVariable(variable: $variable) {\n    id\n    name\n    unit\n    createdAt\n    updatedAt\n    description\n  }\n}\n"
  }
};
})();

(node as any).hash = "626284626121d22c7a39a2cf0c11c531";

export default node;
