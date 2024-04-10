import * as React from "react";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import Card from "./Card";
import type { ViewerProfileFragment$key } from "./__generated__/ViewerProfileFragment.graphql";

const ViewerProfileFragment = graphql`
  fragment ViewerProfileFragment on Viewer {
    actor {
      name
      profilePicture {
        url
      }
    }
  }
`;

export default function ViewerProfile({
  viewer,
}: {
  viewer: ViewerProfileFragment$key;
}): React.ReactElement {
  const data = useFragment(ViewerProfileFragment, viewer);

  return (
    <Card dim={true}>
      <div className="viewerProfile">
        <img src={data.actor.profilePicture.url} height="60" width="60" />
        <div className="viewerProfile__name">{data.actor.name}</div>
        <div className="viewerProfile__menu">⋯</div>
      </div>
    </Card>
  );
}
