import * as React from "react";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import Hovercard from "./Hovercard";
import Image from "./Image";
import PosterDetailsHovercardContents from "./PosterDetailsHovercardContents";
import { PosterBylineFragment$key } from "./__generated__/PosterBylineFragment.graphql";

const PosterBylineFragment = graphql`
  fragment PosterBylineFragment on Actor {
    id
    name
    profilePicture {
      ...ImageFragment @arguments(width: 60, height: 60)
    }
  }
`;

export type Props = {
  poster: PosterBylineFragment$key;
};

export default function PosterByline({ poster }: Props): React.ReactElement {
  const hoverRef = React.useRef<HTMLDivElement>(null);
  const data = useFragment(PosterBylineFragment, poster);

  return (
    <div className="byline" ref={hoverRef}>
      <Image
        image={data.profilePicture}
        width={60}
        height={60}
        className="byline__image"
      />
      <div className="byline__name">{data.name}</div>

      <Hovercard targetRef={hoverRef}>
        <PosterDetailsHovercardContents posterId={data.id} />
      </Hovercard>
    </div>
  );
}
