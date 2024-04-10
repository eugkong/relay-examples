import * as React from "react"; // Need this import statement.
import { usePaginationFragment } from "react-relay";
import { graphql } from "relay-runtime";
import InfiniteScrollTrigger from "./InfiniteScrollTrigger";
import Story from "./Story";
import { NewsfeedFragment$key } from "./__generated__/NewsfeedFragment.graphql";

/* The graphql`` tag allows the Relay compiler to find and compile the GraphQL within a Javascript codebase. */
const NewsfeedFragment = graphql`
  fragment NewsfeedFragment on Query
  @refetchable(queryName: "NewsfeedContentsRefetchQuery")
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 2 }
    cursor: { type: "String" }
  ) {
    viewer {
      newsfeedStories(first: $count, after: $cursor)
        @connection(key: "NewsfeedFragment_newsfeedStories") {
        edges {
          node {
            id
            ...StoryFragment
          }
        }
      }
    }
  }
`;

type Props = {
  newsfeed: NewsfeedFragment$key;
};

export default function Newsfeed({ newsfeed }: Props): React.ReactElement {
  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment(
    NewsfeedFragment,
    newsfeed
  );

  const storyEdges = data.viewer.newsfeedStories.edges;

  const onEndReached = () => {
    loadNext(2);
  };

  return (
    <div className="newsfeed">
      {storyEdges.map((storyEdge) => (
        <Story key={storyEdge.node.id} story={storyEdge.node} />
      ))}
      <InfiniteScrollTrigger
        onEndReached={onEndReached}
        hasNext={hasNext}
        isLoadingNext={isLoadingNext}
      />
    </div>
  );
}
