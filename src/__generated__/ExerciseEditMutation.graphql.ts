/**
 * @generated SignedSource<<5c75d4a312323f89c730b0e529a56047>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ExerciseInputWithId = {
  category: string;
  id: string;
  name: string;
  url: string;
};
export type ExerciseEditMutation$variables = {
  exercise: ExerciseInputWithId;
};
export type ExerciseEditMutation$data = {
  readonly editExercise: {
    readonly category: string;
    readonly createdAt: string;
    readonly id: string;
    readonly name: string;
    readonly updatedAt: string;
    readonly url: string;
  } | null | undefined;
};
export type ExerciseEditMutation = {
  response: ExerciseEditMutation$data;
  variables: ExerciseEditMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "exercise"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "exercise",
        "variableName": "exercise"
      }
    ],
    "concreteType": "Exercise",
    "kind": "LinkedField",
    "name": "editExercise",
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ExerciseEditMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ExerciseEditMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "033f99d57f5da74d091691a7a84d24c2",
    "id": null,
    "metadata": {},
    "name": "ExerciseEditMutation",
    "operationKind": "mutation",
    "text": "mutation ExerciseEditMutation(\n  $exercise: ExerciseInputWithId!\n) {\n  editExercise(exercise: $exercise) {\n    id\n    url\n    name\n    category\n    createdAt\n    updatedAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "ce21931ca13c8030870a450d8fc33a97";

export default node;
