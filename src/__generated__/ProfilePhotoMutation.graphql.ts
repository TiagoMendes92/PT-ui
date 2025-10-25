/**
 * @generated SignedSource<<ee29f8522c609968b8015c23b41948d6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ProfilePhotoMutation$variables = {
  file: any;
};
export type ProfilePhotoMutation$data = {
  readonly uploadProfilePhoto: {
    readonly id: string;
    readonly photographyKey: string | null | undefined;
    readonly photographyUrl: string | null | undefined;
  };
};
export type ProfilePhotoMutation = {
  response: ProfilePhotoMutation$data;
  variables: ProfilePhotoMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "file"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "file",
        "variableName": "file"
      }
    ],
    "concreteType": "AlunoDetails",
    "kind": "LinkedField",
    "name": "uploadProfilePhoto",
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
        "name": "photographyUrl",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "photographyKey",
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
    "name": "ProfilePhotoMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfilePhotoMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9ffa0c965aefc10cb555d78d900728eb",
    "id": null,
    "metadata": {},
    "name": "ProfilePhotoMutation",
    "operationKind": "mutation",
    "text": "mutation ProfilePhotoMutation(\n  $file: Upload!\n) {\n  uploadProfilePhoto(file: $file) {\n    id\n    photographyUrl\n    photographyKey\n  }\n}\n"
  }
};
})();

(node as any).hash = "ef82fa1e462bf9ff4cedac09734406cd";

export default node;
