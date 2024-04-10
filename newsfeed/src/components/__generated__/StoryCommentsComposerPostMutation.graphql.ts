/**
 * @generated SignedSource<<cf907677dc16083749a2fe7adc67b153>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type StoryCommentsComposerPostMutation$variables = {
  connections: ReadonlyArray<string>;
  storyId: string;
  text: string;
};
export type StoryCommentsComposerPostMutation$data = {
  readonly postStoryComment: {
    readonly commentEdge: {
      readonly node: {
        readonly id: string;
        readonly text: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type StoryCommentsComposerPostMutation = {
  response: StoryCommentsComposerPostMutation$data;
  variables: StoryCommentsComposerPostMutation$variables;
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
  "name": "storyId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "text"
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "storyId"
  },
  {
    "kind": "Variable",
    "name": "text",
    "variableName": "text"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "CommentsConnectionEdge",
  "kind": "LinkedField",
  "name": "commentEdge",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Comment",
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
          "name": "text",
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
    "name": "StoryCommentsComposerPostMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "StoryCommentMutationResponse",
        "kind": "LinkedField",
        "name": "postStoryComment",
        "plural": false,
        "selections": [
          (v4/*: any*/)
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
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "StoryCommentsComposerPostMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "StoryCommentMutationResponse",
        "kind": "LinkedField",
        "name": "postStoryComment",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "commentEdge",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "492fc0c01fc9d4acc7e98496fcd5261a",
    "id": null,
    "metadata": {},
    "name": "StoryCommentsComposerPostMutation",
    "operationKind": "mutation",
    "text": "mutation StoryCommentsComposerPostMutation(\n  $storyId: ID!\n  $text: String!\n) {\n  postStoryComment(id: $storyId, text: $text) {\n    commentEdge {\n      node {\n        id\n        text\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9b93e710db735c6a1469c729cab2f485";

export default node;
