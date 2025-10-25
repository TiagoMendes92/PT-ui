/**
 * @generated SignedSource<<9583d664e281c309cd3fd558c4283cf3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ExerciseDeleteMutation$variables = {
  id: string;
};
export type ExerciseDeleteMutation$data = {
  readonly deleteExercise: string | null | undefined;
};
export type ExerciseDeleteMutation = {
  response: ExerciseDeleteMutation$data;
  variables: ExerciseDeleteMutation$variables;
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
  "name": "deleteExercise",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ExerciseDeleteMutation",
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
    "name": "ExerciseDeleteMutation",
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "deleteRecord",
        "key": "",
        "kind": "ScalarHandle",
        "name": "deleteExercise"
      }
    ]
  },
  "params": {
    "cacheID": "021c275dc2538328907932a3e61e814a",
    "id": null,
    "metadata": {},
    "name": "ExerciseDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation ExerciseDeleteMutation(\n  $id: String!\n) {\n  deleteExercise(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "649e251103df487013d40cc6a58800c5";

export default node;
