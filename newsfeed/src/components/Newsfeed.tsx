import * as React from "react"; // Need this import statement.
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import Story from "./Story";
import type { NewsfeedQuery as NewsfeedQueryType } from "./__generated__/NewsfeedQuery.graphql";

/* The graphql`` tag allows the Relay compiler to find and compile the GraphQL within a Javascript codebase. */
const NewsfeedQuery = graphql`
  query NewsfeedQuery {
    topStory {
      # When you spread a fragment into a query (or another fragment),
      # the part of the query result corresponding to where you spread the fragment
      # becomes a fragment key for that fragment.
      # This is the object that you pass to a component in its props in order to
      # give it a specific place in the graph to read the fragment from.
      ...StoryFragment
    }
  }
`;

export default function Newsfeed(): React.ReactElement {
  const data = useLazyLoadQuery<NewsfeedQueryType>(NewsfeedQuery, {});
  const story = data.topStory; // Fragment key.

  return (
    <div className="newsfeed">
      <Story story={story} />
    </div>
  );
}
