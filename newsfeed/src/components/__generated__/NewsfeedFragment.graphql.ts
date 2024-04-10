/**
 * @generated SignedSource<<6d34792f451e7f20ffeae0d350e18711>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewsfeedFragment$data = {
  readonly topStories: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"StoryFragment">;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "NewsfeedFragment";
};
export type NewsfeedFragment$key = {
  readonly " $data"?: NewsfeedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NewsfeedFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewsfeedFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Story",
      "kind": "LinkedField",
      "name": "topStories",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "StoryFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "a067b19331ece5e8f608803df1d2a8c3";

export default node;
