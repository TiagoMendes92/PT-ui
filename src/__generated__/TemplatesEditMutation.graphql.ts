/**
 * @generated SignedSource<<0a60ae66c242d12e87ac5ed2ba592a27>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UpdateTemplateInput = {
  description?: string | null | undefined;
  exercises: ReadonlyArray<TemplateExerciseInput>;
  id: string;
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
export type TemplatesEditMutation$variables = {
  file?: any | null | undefined;
  input: UpdateTemplateInput;
};
export type TemplatesEditMutation$data = {
  readonly updateTemplate: {
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
export type TemplatesEditMutation = {
  response: TemplatesEditMutation$data;
  variables: TemplatesEditMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "file"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
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
  "name": "url",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "Photo",
  "kind": "LinkedField",
  "name": "photo",
  "plural": false,
  "selections": [
    (v8/*: any*/),
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
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "orderPosition",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "Exercise",
  "kind": "LinkedField",
  "name": "exercise",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v4/*: any*/),
    (v8/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "category",
      "storageKey": null
    },
    (v9/*: any*/)
  ],
  "storageKey": null
},
v12 = {
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
    "name": "TemplatesEditMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Template",
        "kind": "LinkedField",
        "name": "updateTemplate",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "TemplateExercise",
            "kind": "LinkedField",
            "name": "exercises",
            "plural": true,
            "selections": [
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/)
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
    "name": "TemplatesEditMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Template",
        "kind": "LinkedField",
        "name": "updateTemplate",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "TemplateExercise",
            "kind": "LinkedField",
            "name": "exercises",
            "plural": true,
            "selections": [
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5dade338081c44e6b56a954e0e87bbfd",
    "id": null,
    "metadata": {},
    "name": "TemplatesEditMutation",
    "operationKind": "mutation",
    "text": "mutation TemplatesEditMutation(\n  $input: UpdateTemplateInput!\n  $file: Upload\n) {\n  updateTemplate(input: $input, file: $file) {\n    id\n    name\n    description\n    createdAt\n    updatedAt\n    photo {\n      url\n      key\n    }\n    exercises {\n      orderPosition\n      exercise {\n        id\n        name\n        url\n        category\n        photo {\n          url\n          key\n        }\n      }\n      sets {\n        setNumber\n        variables {\n          variable {\n            id\n            name\n            unit\n          }\n          targetValue\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "919b5530055ce99ca314cddcc60cec39";

export default node;
