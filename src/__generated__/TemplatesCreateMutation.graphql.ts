/**
 * @generated SignedSource<<5cd2e2536aa8d80146b9afd84a077218>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CreateTemplateInput = {
  description?: string | null | undefined;
  exercises: ReadonlyArray<TemplateExerciseInput>;
  name: string;
};
export type TemplateExerciseInput = {
  exerciseId: string;
  orderPosition: number;
  sets: ReadonlyArray<TemplateExerciseSetInput>;
};
export type TemplateExerciseSetInput = {
  setNumber: number;
  variables: ReadonlyArray<TemplateExerciseSetVariableInput>;
};
export type TemplateExerciseSetVariableInput = {
  targetValue?: string | null | undefined;
  variableId: string;
};
export type TemplatesCreateMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateTemplateInput;
};
export type TemplatesCreateMutation$data = {
  readonly createTemplate: {
    readonly createdAt: string;
    readonly description: string | null | undefined;
    readonly exercises: ReadonlyArray<{
      readonly exercise: {
        readonly category: string;
        readonly id: string;
        readonly name: string;
        readonly url: string;
      };
      readonly orderPosition: number;
      readonly sets: ReadonlyArray<{
        readonly setNumber: number;
        readonly variables: ReadonlyArray<{
          readonly targetValue: string | null | undefined;
          readonly variable: {
            readonly id: string;
            readonly name: string;
            readonly unit: string | null | undefined;
          };
        }>;
      }>;
    }>;
    readonly id: string;
    readonly name: string;
    readonly updatedAt: string;
  };
};
export type TemplatesCreateMutation = {
  response: TemplatesCreateMutation$data;
  variables: TemplatesCreateMutation$variables;
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
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "orderPosition",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "Exercise",
  "kind": "LinkedField",
  "name": "exercise",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v4/*: any*/),
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
      "name": "category",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "TemplateExerciseSet",
  "kind": "LinkedField",
  "name": "sets",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "setNumber",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "TemplateExerciseSetVariable",
      "kind": "LinkedField",
      "name": "variables",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ExerciseVariable",
          "kind": "LinkedField",
          "name": "variable",
          "plural": false,
          "selections": [
            (v3/*: any*/),
            (v4/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "unit",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "targetValue",
          "storageKey": null
        }
      ],
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
    "name": "TemplatesCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Template",
        "kind": "LinkedField",
        "name": "createTemplate",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "TemplateExercise",
            "kind": "LinkedField",
            "name": "exercises",
            "plural": true,
            "selections": [
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
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
    "name": "TemplatesCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Template",
        "kind": "LinkedField",
        "name": "createTemplate",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "TemplateExercise",
            "kind": "LinkedField",
            "name": "exercises",
            "plural": true,
            "selections": [
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "filters": null,
        "handle": "prependNode",
        "key": "",
        "kind": "LinkedHandle",
        "name": "createTemplate",
        "handleArgs": [
          {
            "kind": "Variable",
            "name": "connections",
            "variableName": "connections"
          },
          {
            "kind": "Literal",
            "name": "edgeTypeName",
            "value": "TemplateEdge"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "be4e58fc03ef7d6ac6d09f19a8f741eb",
    "id": null,
    "metadata": {},
    "name": "TemplatesCreateMutation",
    "operationKind": "mutation",
    "text": "mutation TemplatesCreateMutation(\n  $input: CreateTemplateInput!\n) {\n  createTemplate(input: $input) {\n    id\n    name\n    description\n    createdAt\n    updatedAt\n    exercises {\n      orderPosition\n      exercise {\n        id\n        name\n        url\n        category\n      }\n      sets {\n        setNumber\n        variables {\n          variable {\n            id\n            name\n            unit\n          }\n          targetValue\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0266fb6c3df33cf0141258dccafa530f";

export default node;
