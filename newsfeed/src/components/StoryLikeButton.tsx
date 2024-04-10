import * as React from "react";
import { useFragment, useMutation } from "react-relay";
import { graphql } from "relay-runtime";
import type { StoryLikeButtonFragment$key } from "./__generated__/StoryLikeButtonFragment.graphql";

type Props = {
  story: StoryLikeButtonFragment$key;
};

const StoryLikeButtonFragment = graphql`
  fragment StoryLikeButtonFragment on Story {
    id
    likeCount
    doesViewerLike
  }
`;

const StoryLikeButtonLikeMutation = graphql`
  mutation StoryLikeButtonLikeMutation($id: ID!, $doesLike: Boolean!) {
    likeStory(id: $id, doesLike: $doesLike) {
      story {
        # Include the id field so that Relay will automatically update the record in the store
        # when the mutation response is received.
        ...StoryLikeButtonFragment
      }
    }
  }
`;

export default function StoryLikeButton({ story }: Props): React.ReactElement {
  const data = useFragment<StoryLikeButtonFragment$key>(
    StoryLikeButtonFragment,
    story
  );

  const [commitMutation] = useMutation(StoryLikeButtonLikeMutation);

  const onLikeButtonClicked = () => {
    commitMutation({
      variables: {
        id: data.id,
        doesLike: !data.doesViewerLike,
      },

      /**
       * All writes made in the optimistic updater will be applied immediately when
       * the mutation is dispatched, and then rolled back when it is completed.
       */
      optimisticUpdater: (store) => {
        /**
         * Unlike normal fragments, updatable fragments are not spread into queries
         * and do not select data to be fetched from the server.
         * Instead, they select data that's already in the Relay local data store
         * so that the data may be updated.
         */
        const fragment = graphql`
          fragment StoryLikeButton_updatable on Story @updatable {
            likeCount
            doesViewerLike
          }
        `;

        const { updatableData } = store.readUpdatableFragment(fragment, story);
        const alreadyLikes = updatableData.doesViewerLike;
        updatableData.doesViewerLike = !alreadyLikes;
        updatableData.likeCount += alreadyLikes ? -1 : 1;
      },
    });
  };

  return (
    <div className="likeButton">
      <LikeCount count={data.likeCount} />
      <LikeButton
        doesViewerLike={data.doesViewerLike}
        onClick={onLikeButtonClicked}
      />
    </div>
  );
}

function LikeCount({ count }: { count: number }) {
  return <div className="likeButton__count">{count} likes</div>;
}

function LikeButton({
  doesViewerLike,
  onClick,
  disabled,
}: {
  doesViewerLike: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className="likeButton__button"
      onClick={onClick}
      disabled={disabled}
    >
      <span
        className={
          doesViewerLike
            ? "likeButton__thumb__viewerLikes"
            : "likeButton__thumb__viewerDoesNotLike"
        }
      >
        👍
      </span>{" "}
      <span
        className={
          doesViewerLike
            ? "likeButton__label__viewerLikes"
            : "likeButton__label__viewerDoesNotLike"
        }
      >
        Like
      </span>
    </button>
  );
}
