import * as React from "react";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import ContactsList from "./ContactsList";
import LoadingSpinner from "./LoadingSpinner";
import ViewerProfile from "./ViewerProfile";
import { SidebarFragment$key } from "./__generated__/SidebarFragment.graphql";

const SidebarFragment = graphql`
  fragment SidebarFragment on Query {
    viewer {
      ...ViewerProfileFragment
      ...ContactsListFragment
    }
  }
`;

type Props = {
  sidebarContents: SidebarFragment$key;
};

export default function Sidebar({ sidebarContents }: Props) {
  return (
    <div className="sidebar">
      <React.Suspense fallback={<LoadingSpinner />}>
        <SidebarContents sidebarContents={sidebarContents} />
      </React.Suspense>
    </div>
  );
}

function SidebarContents({ sidebarContents }: Props) {
  const { viewer } = useFragment(SidebarFragment, sidebarContents);

  return (
    <>
      <ViewerProfile viewer={viewer} />
      <ContactsList viewer={viewer} />
    </>
  );
}
