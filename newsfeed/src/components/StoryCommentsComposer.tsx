import * as React from "react";
import { useFragment, useMutation } from "react-relay";
import { ConnectionHandler, graphql } from "relay-runtime";

import type { StoryCommentsComposerFragment$key } from "./__generated__/StoryCommentsComposerFragment.graphql";

const { useState } = React;

export type Props = {
  story: StoryCommentsComposerFragment$key;
};

const StoryCommentsComposerFragment = graphql`
  fragment StoryCommentsComposerFragment on Story {
    id
  }
`;

const StoryCommentsComposerPostMutation = graphql`
  mutation StoryCommentsComposerPostMutation(
    $storyId: ID!
    $text: String!
    $connections: [ID!]!
  ) {
    postStoryComment(id: $storyId, text: $text) {
      commentEdge @prependEdge(connections: $connections) {
        node {
          id
          text
        }
      }
    }
  }
`;

export default function StoryCommentsComposer({ story }: Props) {
  const data = useFragment(StoryCommentsComposerFragment, story);

  const [commitMutation, isMutationInFlight] = useMutation(
    StoryCommentsComposerPostMutation
  );

  const [text, setText] = useState("");

  function onPost() {
    const storyId = data.id;

    const connectionId = ConnectionHandler.getConnectionID(
      storyId,
      /**
       * The key provided in the `@connection` directive, to distinguish connections
       * in case more than one connection is off of the same node.
       */
      "StoryCommentsSectionFragment_comments"
    );

    commitMutation({
      variables: {
        storyId,
        text,
        connections: [connectionId],
      },
    });

    setText("");
  }

  return (
    <div className="commentsComposer">
      <TextComposer text={text} onChange={setText} onReturn={onPost} />
      <PostButton onClick={onPost} />
    </div>
  );
}

function TextComposer({
  text,
  onChange,
  onReturn,
}: {
  text: string;
  onChange: (newValue: string) => void;
  onReturn: () => void;
}) {
  return (
    <input
      value={text}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          onReturn();
        }
      }}
    />
  );
}

function PostButton({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick}>Post</button>;
}
