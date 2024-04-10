import * as React from "react";
import RelayEnvironment from "../relay/RelayEnvironment";
import LoadingSpinner from "./LoadingSpinner";
import Page from "./Page";

export default function App(): React.ReactElement {
  return (
    <RelayEnvironment>
      <React.Suspense fallback={<LoadingSpinner />}>
        <div className="app">
          <Page />
        </div>
      </React.Suspense>
    </RelayEnvironment>
  );
}
