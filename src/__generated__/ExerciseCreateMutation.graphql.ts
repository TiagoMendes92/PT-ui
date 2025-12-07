/**
 * @generated SignedSource<<db87f2b10dd1e32459938766b44431c5>>
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
  file?: any | null | undefined;
};
export type ExerciseCreateMutation$data = {
  readonly addExercise: {
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
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "file"
},
v3 = [
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": (v3/*: any*/),
  "concreteType": "Exercise",
  "kind": "LinkedField",
  "name": "addExercise",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    (v5/*: any*/),
    (v6/*: any*/),
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
        (v4/*: any*/),
        (v6/*: any*/)
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
        (v5/*: any*/),
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
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ExerciseCreateMutation",
    "selections": [
      (v7/*: any*/)
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "ExerciseCreateMutation",
    "selections": [
      (v7/*: any*/),
      {
        "alias": null,
        "args": (v3/*: any*/),
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
    "cacheID": "0594d20dfa3d2719d6a21054f90130cf",
    "id": null,
    "metadata": {},
    "name": "ExerciseCreateMutation",
    "operationKind": "mutation",
    "text": "mutation ExerciseCreateMutation(\n  $exercise: ExerciseInput!\n  $file: Upload\n) {\n  addExercise(exercise: $exercise, file: $file) {\n    id\n    url\n    name\n    category\n    allCategories {\n      id\n      name\n    }\n    photo {\n      url\n      key\n    }\n    createdAt\n    updatedAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "9d14937c2dc0a18bc8ca066cace66b7c";

export default node;
