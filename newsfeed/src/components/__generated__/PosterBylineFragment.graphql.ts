/**
 * @generated SignedSource<<3765b3c5c9014db14d5a7981abcb39ca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PosterBylineFragment$data = {
  readonly name: string | null | undefined;
  readonly profilePicture: {
    readonly " $fragmentSpreads": FragmentRefs<"ImageFragment">;
  } | null | undefined;
  readonly " $fragmentType": "PosterBylineFragment";
};
export type PosterBylineFragment$key = {
  readonly " $data"?: PosterBylineFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PosterBylineFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PosterBylineFragment",
  "selections": [
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
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "profilePicture",
      "plural": false,
      "selections": [
        {
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 60
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 60
            }
          ],
          "kind": "FragmentSpread",
          "name": "ImageFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Actor",
  "abstractKey": "__isActor"
};

(node as any).hash = "938d765c6f632a3114b21ce8d9887441";

export default node;
