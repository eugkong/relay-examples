import * as React from "react";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import Image from "./Image";
import OrganizationKind from "./OrganizationKind";
import Timestamp from "./Timestamp";
import { PosterDetailsHovercardContentsBodyFragment$key } from "./__generated__/PosterDetailsHovercardContentsBodyFragment.graphql";
import type { PosterDetailsHovercardContentsQuery as QueryType } from "./__generated__/PosterDetailsHovercardContentsQuery.graphql";

export const PosterDetailsHovercardContentsQuery = graphql`
  # Query variable: $posterId
  query PosterDetailsHovercardContentsQuery($posterId: ID!) {
    # Query variable used as field argument. Can also be used as fragment argument.
    node(id: $posterId) {
      # Type refinement. Specifies the type to expect.
      ... on Actor {
        ...PosterDetailsHovercardContentsBodyFragment
      }
    }
  }
`;

export default function PosterDetailsHovercardContents({
  queryRef,
}: {
  queryRef: PreloadedQuery<QueryType>;
}): React.ReactElement {
  const data = usePreloadedQuery<QueryType>(
    PosterDetailsHovercardContentsQuery,
    queryRef
  );

  return (
    <div className="posterHovercard">
      <PosterDetailsHovercardContentsBody poster={data.node} />
    </div>
  );
}

const PosterDetailsHovercardContentsBodyFragment = graphql`
  fragment PosterDetailsHovercardContentsBodyFragment on Actor {
    id
    name
    joined
    profilePicture {
      ...ImageFragment
    }
    ... on Organization {
      organizationKind
    }
    ... on Person {
      location {
        name
      }
    }
  }
`;

function PosterDetailsHovercardContentsBody({
  poster,
}: {
  poster: PosterDetailsHovercardContentsBodyFragment$key;
}) {
  const data = useFragment(PosterDetailsHovercardContentsBodyFragment, poster);
  return (
    <>
      <Image
        image={data.profilePicture}
        width={128}
        height={128}
        className="posterHovercard__image"
      />
      <div className="posterHovercard__name">{data.name}</div>
      <ul className="posterHovercard__details">
        <li>
          Joined <Timestamp time={data.joined} />
        </li>
        <li>
          {data.organizationKind && (
            <OrganizationKind kind={data.organizationKind} />
          )}
          {data.location && data.location.name}
        </li>
      </ul>
      <div className="posterHovercard__buttons">
        <button>Friend</button>
        <button>Message</button>
      </div>
    </>
  );
}
