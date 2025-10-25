/**
 * @generated SignedSource<<f8487314963c402db5ba5ffa057d68db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TemplatesDeleteMutation$variables = {
  id: string;
};
export type TemplatesDeleteMutation$data = {
  readonly deleteTemplate: string | null | undefined;
};
export type TemplatesDeleteMutation = {
  response: TemplatesDeleteMutation$data;
  variables: TemplatesDeleteMutation$variables;
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
  "name": "deleteTemplate",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TemplatesDeleteMutation",
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
    "name": "TemplatesDeleteMutation",
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "deleteRecord",
        "key": "",
        "kind": "ScalarHandle",
        "name": "deleteTemplate"
      }
    ]
  },
  "params": {
    "cacheID": "27e08b93db818b6b5c5cb26b650ab0ff",
    "id": null,
    "metadata": {},
    "name": "TemplatesDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation TemplatesDeleteMutation(\n  $id: String!\n) {\n  deleteTemplate(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "f185aa806e1fb015860e5eed215e6466";

export default node;
