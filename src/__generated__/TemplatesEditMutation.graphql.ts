/**
 * @generated SignedSource<<9ea8ed610878d3723ea4c8fc3c5f26c8>>
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
};
export type TemplatesEditMutation$variables = {
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
        readonly url: string;
      };
      readonly orderPosition: number;
    }>;
    readonly id: string;
    readonly name: string;
    readonly updatedAt: string;
  };
};
export type TemplatesEditMutation = {
  response: TemplatesEditMutation$data;
  variables: TemplatesEditMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "orderPosition",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "Exercise",
  "kind": "LinkedField",
  "name": "exercise",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TemplatesEditMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Template",
        "kind": "LinkedField",
        "name": "updateTemplate",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "TemplateExercise",
            "kind": "LinkedField",
            "name": "exercises",
            "plural": true,
            "selections": [
              (v7/*: any*/),
              (v8/*: any*/)
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TemplatesEditMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Template",
        "kind": "LinkedField",
        "name": "updateTemplate",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "TemplateExercise",
            "kind": "LinkedField",
            "name": "exercises",
            "plural": true,
            "selections": [
              (v7/*: any*/),
              (v8/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6f7c36390581920c5d00dee4ff9dfe94",
    "id": null,
    "metadata": {},
    "name": "TemplatesEditMutation",
    "operationKind": "mutation",
    "text": "mutation TemplatesEditMutation(\n  $input: UpdateTemplateInput!\n) {\n  updateTemplate(input: $input) {\n    id\n    name\n    description\n    createdAt\n    updatedAt\n    exercises {\n      orderPosition\n      exercise {\n        id\n        name\n        url\n        category\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "568241f8f3e5039f70f1b5b9a8df1159";

export default node;
