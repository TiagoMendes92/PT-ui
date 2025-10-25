/**
 * @generated SignedSource<<04acf035d8134dad8898dbb01b7df6b2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExerciseVariablesPaginatedQuery$variables = {
  after?: string | null | undefined;
  first?: number | null | undefined;
  searchTerm?: string | null | undefined;
};
export type ExerciseVariablesPaginatedQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ExerciseVariables">;
};
export type ExerciseVariablesPaginatedQuery = {
  response: ExerciseVariablesPaginatedQuery$data;
  variables: ExerciseVariablesPaginatedQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "searchTerm"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "searchTerm",
    "variableName": "searchTerm"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ExerciseVariablesPaginatedQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "ExerciseVariables"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ExerciseVariablesPaginatedQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ExerciseVariablesConnection",
        "kind": "LinkedField",
        "name": "exerciseVariables",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ExerciseVariableEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ExerciseVariable",
                "kind": "LinkedField",
                "name": "node",
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasPreviousPage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "startCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": [
          "searchTerm"
        ],
        "handle": "connection",
        "key": "ExerciseVariablesPaginatedQuery_exerciseVariables",
        "kind": "LinkedHandle",
        "name": "exerciseVariables"
      }
    ]
  },
  "params": {
    "cacheID": "a1f267f51a3b9b36569c390a53ce10f4",
    "id": null,
    "metadata": {},
    "name": "ExerciseVariablesPaginatedQuery",
    "operationKind": "query",
    "text": "query ExerciseVariablesPaginatedQuery(\n  $after: String\n  $first: Int\n  $searchTerm: String\n) {\n  ...ExerciseVariables_2s884C\n}\n\nfragment ExerciseVariables_2s884C on Query {\n  exerciseVariables(first: $first, after: $after, searchTerm: $searchTerm) {\n    edges {\n      node {\n        id\n        name\n        unit\n        createdAt\n        updatedAt\n        description\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "546d7198ac82675c3d605e5b2a8cb4a8";

export default node;
