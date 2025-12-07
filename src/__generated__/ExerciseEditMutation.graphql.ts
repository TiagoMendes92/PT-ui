/**
 * @generated SignedSource<<324d0335ea5dd58e990f83dba1e0946f>>
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
  file?: any | null | undefined;
};
export type ExerciseEditMutation$data = {
  readonly editExercise: {
    readonly allCategories: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
    }>;
    readonly category: string;
    readonly createdAt: string;
    readonly id: string;
    readonly name: string;
    readonly photo: {
      readonly key: string;
      readonly url: string;
    } | null | undefined;
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "file"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "exercise",
        "variableName": "exercise"
      },
      {
        "kind": "Variable",
        "name": "file",
        "variableName": "file"
      }
    ],
    "concreteType": "Exercise",
    "kind": "LinkedField",
    "name": "editExercise",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
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
        "concreteType": "Category",
        "kind": "LinkedField",
        "name": "allCategories",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Photo",
        "kind": "LinkedField",
        "name": "photo",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "key",
            "storageKey": null
          }
        ],
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
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ExerciseEditMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "a47e8f322ba1810eba3f60a2af166f08",
    "id": null,
    "metadata": {},
    "name": "ExerciseEditMutation",
    "operationKind": "mutation",
    "text": "mutation ExerciseEditMutation(\n  $exercise: ExerciseInputWithId!\n  $file: Upload\n) {\n  editExercise(exercise: $exercise, file: $file) {\n    id\n    url\n    name\n    category\n    allCategories {\n      id\n      name\n    }\n    photo {\n      url\n      key\n    }\n    createdAt\n    updatedAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "b2de40bfcda9777c9fe39695351e5109";

export default node;
