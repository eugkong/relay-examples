import * as React from "react";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import Newsfeed from "./Newsfeed";
import Sidebar from "./Sidebar";
import type { PageQuery as PageQueryType } from "./__generated__/PageQuery.graphql";

const PageQuery = graphql`
  query PageQuery {
    # When you spread a fragment into a query (or another fragment),
    # the part of the query result corresponding to where you spread the fragment
    # becomes a fragment key for that fragment.
    # This is the object that you pass to a component in its props in order to
    # give it a specific place in the graph to read the fragment from.
    ...NewsfeedFragment
    ...SidebarFragment
  }
`;

export default function Page(): React.ReactElement {
  const data = useLazyLoadQuery<PageQueryType>(PageQuery, {});

  return (
    <div className="page">
      <Newsfeed newsfeed={data} />
      <Sidebar sidebarContents={data} />
    </div>
  );
}
