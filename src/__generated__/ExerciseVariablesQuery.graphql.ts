/**
 * @generated SignedSource<<6e8bb1a6c77d84241cb7c91079386a4b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExerciseVariablesQuery$variables = {
  first?: number | null | undefined;
  searchTerm?: string | null | undefined;
};
export type ExerciseVariablesQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ExerciseVariables">;
};
export type ExerciseVariablesQuery = {
  response: ExerciseVariablesQuery$data;
  variables: ExerciseVariablesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
    "name": "ExerciseVariablesQuery",
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
    "name": "ExerciseVariablesQuery",
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
    "cacheID": "f915c8085ebbb2a140d1550bba8e999a",
    "id": null,
    "metadata": {},
    "name": "ExerciseVariablesQuery",
    "operationKind": "query",
    "text": "query ExerciseVariablesQuery(\n  $first: Int\n  $searchTerm: String\n) {\n  ...ExerciseVariables_A49pD\n}\n\nfragment ExerciseVariables_A49pD on Query {\n  exerciseVariables(first: $first, searchTerm: $searchTerm) {\n    edges {\n      node {\n        id\n        name\n        unit\n        createdAt\n        updatedAt\n        description\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "56d044ef227c2d3d8345d8d63462e136";

export default node;
