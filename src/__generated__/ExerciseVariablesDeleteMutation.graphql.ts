/**
 * @generated SignedSource<<e39ce331632cc278f8dbe44dd0ea6ebc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ExerciseVariablesDeleteMutation$variables = {
  id: string;
};
export type ExerciseVariablesDeleteMutation$data = {
  readonly deleteExerciseVariable: string | null | undefined;
};
export type ExerciseVariablesDeleteMutation = {
  response: ExerciseVariablesDeleteMutation$data;
  variables: ExerciseVariablesDeleteMutation$variables;
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
  "name": "deleteExerciseVariable",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ExerciseVariablesDeleteMutation",
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
    "name": "ExerciseVariablesDeleteMutation",
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "deleteRecord",
        "key": "",
        "kind": "ScalarHandle",
        "name": "deleteExerciseVariable"
      }
    ]
  },
  "params": {
    "cacheID": "cfcd5a5df65398de739bb5976269b71f",
    "id": null,
    "metadata": {},
    "name": "ExerciseVariablesDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation ExerciseVariablesDeleteMutation(\n  $id: ID!\n) {\n  deleteExerciseVariable(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "89ba09cf15fc7d6e12d0b8a84b59fcad";

export default node;
