/**
 * @generated SignedSource<<623df3f7455f6090da0fc6b41c9f386c>>
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
  file?: any | null | undefined;
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
        readonly photo: {
          readonly key: string;
          readonly url: string;
        } | null | undefined;
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
    readonly photo: {
      readonly key: string;
      readonly url: string;
    } | null | undefined;
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
  "name": "file"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v3 = [
  {
    "kind": "Variable",
    "name": "file",
    "variableName": "file"
  },
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
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
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "Photo",
  "kind": "LinkedField",
  "name": "photo",
  "plural": false,
  "selections": [
    (v7/*: any*/),
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
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "orderPosition",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "Exercise",
  "kind": "LinkedField",
  "name": "exercise",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    (v5/*: any*/),
    (v7/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "category",
      "storageKey": null
    },
    (v8/*: any*/)
  ],
  "storageKey": null
},
v13 = {
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
            (v4/*: any*/),
            (v5/*: any*/),
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
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TemplatesCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Template",
        "kind": "LinkedField",
        "name": "createTemplate",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "TemplateExercise",
            "kind": "LinkedField",
            "name": "exercises",
            "plural": true,
            "selections": [
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/)
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
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "TemplatesCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Template",
        "kind": "LinkedField",
        "name": "createTemplate",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "TemplateExercise",
            "kind": "LinkedField",
            "name": "exercises",
            "plural": true,
            "selections": [
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
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
    "cacheID": "98e4fb4e28e3c1160b2cb7c11c33b250",
    "id": null,
    "metadata": {},
    "name": "TemplatesCreateMutation",
    "operationKind": "mutation",
    "text": "mutation TemplatesCreateMutation(\n  $input: CreateTemplateInput!\n  $file: Upload\n) {\n  createTemplate(input: $input, file: $file) {\n    id\n    name\n    description\n    photo {\n      url\n      key\n    }\n    createdAt\n    updatedAt\n    exercises {\n      orderPosition\n      exercise {\n        id\n        name\n        url\n        category\n        photo {\n          url\n          key\n        }\n      }\n      sets {\n        setNumber\n        variables {\n          variable {\n            id\n            name\n            unit\n          }\n          targetValue\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "05c7e97627d6a53f9df23cf239d070ea";

export default node;
