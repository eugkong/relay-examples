/**
 * @generated SignedSource<<2fc8f6e0366d111fdac0870b2bfcf803>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommentFragment$data = {
  readonly text: string | null | undefined;
  readonly " $fragmentType": "CommentFragment";
};
export type CommentFragment$key = {
  readonly " $data"?: CommentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommentFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommentFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "text",
      "storageKey": null
    }
  ],
  "type": "Comment",
  "abstractKey": null
};

(node as any).hash = "dae25128e9e5d808e252fd838b73b4d4";

export default node;
