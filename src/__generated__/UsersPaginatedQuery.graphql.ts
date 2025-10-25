/**
 * @generated SignedSource<<a102015e7489d012ac175bb98ed8d640>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserStatus = "ACTIVE" | "ARCHIVED" | "DEACTIVATED" | "PENDING" | "%future added value";
export type AdminUserFilterInput = {
  search?: string | null | undefined;
  status?: UserStatus | null | undefined;
};
export type UsersPaginatedQuery$variables = {
  after?: string | null | undefined;
  filter?: AdminUserFilterInput | null | undefined;
  first?: number | null | undefined;
};
export type UsersPaginatedQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Users">;
};
export type UsersPaginatedQuery = {
  response: UsersPaginatedQuery$data;
  variables: UsersPaginatedQuery$variables;
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
    "name": "filter"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
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
    "name": "filter",
    "variableName": "filter"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UsersPaginatedQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "Users"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UsersPaginatedQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AdminUserConnection",
        "kind": "LinkedField",
        "name": "adminUsers",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AdminUserEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AdminUser",
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
                    "name": "email",
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
                    "name": "status",
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
                    "name": "deactivatedAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "passwordSetAt",
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
          "filter"
        ],
        "handle": "connection",
        "key": "UsersPaginatedQuery_adminUsers",
        "kind": "LinkedHandle",
        "name": "adminUsers"
      }
    ]
  },
  "params": {
    "cacheID": "5f7df4db868272ea0f059ab3792f60f0",
    "id": null,
    "metadata": {},
    "name": "UsersPaginatedQuery",
    "operationKind": "query",
    "text": "query UsersPaginatedQuery(\n  $after: String\n  $filter: AdminUserFilterInput\n  $first: Int\n) {\n  ...Users_G9cLv\n}\n\nfragment Users_G9cLv on Query {\n  adminUsers(first: $first, after: $after, filter: $filter) {\n    edges {\n      node {\n        id\n        email\n        name\n        status\n        createdAt\n        updatedAt\n        deactivatedAt\n        passwordSetAt\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a3c3f3b35e0d5f83e9d7e8cb615b7cca";

export default node;
