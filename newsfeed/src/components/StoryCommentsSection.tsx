import * as React from "react";
import { usePaginationFragment } from "react-relay";
import { graphql } from "relay-runtime";
import Comment from "./Comment";
import LoadMoreCommentsButton from "./LoadMoreCommentsButton";
import SmallSpinner from "./SmallSpinner";
import StoryCommentsComposer from "./StoryCommentsComposer";
import type { StoryCommentsSectionFragment$key } from "./__generated__/StoryCommentsSectionFragment.graphql";

const { useState, useTransition } = React;

export type Props = {
  story: StoryCommentsSectionFragment$key;
};

// Relay’s pagination features work only with fragments, not entire queries.
const StoryCommentsSectionFragment = graphql`
  fragment StoryCommentsSectionFragment on Story
  @refetchable(queryName: "StoryCommentsSectionPaginationQuery")
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 3 }
    cursor: { type: "String" }
  ) {
    ...StoryCommentsComposerFragment

    comments(first: $count, after: $cursor)
      # key must be unique; used when editing the connection’s contents during mutations.
      @connection(key: "StoryCommentsSectionFragment_comments") {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          ...CommentFragment
        }
      }
    }
  }
`;

export default function StoryCommentsSection({
  story,
}: Props): React.ReactElement {
  const { data, loadNext } = usePaginationFragment(
    StoryCommentsSectionFragment,
    story
  );

  const [isPending, startTransition] = useTransition();

  const onLoadMore = () =>
    startTransition(() => {
      loadNext(3);
    });

  return (
    <div>
      <StoryCommentsComposer story={data} />
      {data.comments.edges.map((edge) => (
        <Comment key={edge.node.id} comment={edge.node} />
      ))}
      {data.comments.pageInfo.hasNextPage && (
        <LoadMoreCommentsButton disabled={isPending} onClick={onLoadMore} />
      )}
      {isPending && <SmallSpinner />}
    </div>
  );
}
