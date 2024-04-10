import * as React from "react"; // Need this import statement.
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import Story from "./Story";
import { NewsfeedFragment$key } from "./__generated__/NewsfeedFragment.graphql";

/* The graphql`` tag allows the Relay compiler to find and compile the GraphQL within a Javascript codebase. */
const NewsfeedFragment = graphql`
  fragment NewsfeedFragment on Query {
    topStories {
      id
      # When you spread a fragment into a query (or another fragment),
      # the part of the query result corresponding to where you spread the fragment
      # becomes a fragment key for that fragment.
      # This is the object that you pass to a component in its props in order to
      # give it a specific place in the graph to read the fragment from.
      ...StoryFragment
    }
  }
`;

type Props = {
  newsfeed: NewsfeedFragment$key;
};

export default function Newsfeed({ newsfeed }: Props): React.ReactElement {
  const { topStories } = useFragment(NewsfeedFragment, newsfeed);

  return (
    <div className="newsfeed">
      {topStories.map((story) => (
        <Story key={story.id} story={story} />
      ))}
    </div>
  );
}
