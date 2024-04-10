import { debounce } from "lodash";
import * as React from "react";
import { useRefetchableFragment } from "react-relay";
import { Options } from "react-relay/relay-hooks/useRefetchableFragmentNode";
import { Variables, graphql } from "relay-runtime";
import Card from "./Card";
import ContactRow from "./ContactRow";
import SearchInput from "./SearchInput";
import type { ContactsListFragment$key } from "./__generated__/ContactsListFragment.graphql";

export type Props = {
  viewer: ContactsListFragment$key;
};

const ContactsListFragment = graphql`
  fragment ContactsListFragment on Viewer
  @refetchable(queryName: "ContactsListRefetchQuery")
  @argumentDefinitions(search: { type: "String", defaultValue: null }) {
    contacts(search: $search) {
      id
      ...ContactRowFragment
    }
  }
`;

export default function ContactsList({ viewer }: Props): React.ReactElement {
  const [data, refetch] = useRefetchableFragment(ContactsListFragment, viewer);
  const [searchString, setSearchString] = React.useState("");
  const [isPending, startTransition] = React.useTransition();

  const refetchDebounced = React.useMemo(
    () =>
      debounce(
        (vars: Partial<Variables>, options?: Options) =>
          /**
           * Transitions are React state updates that do not need to be immediately
           * responded to — React can wait until the data is available.
           */
          startTransition(() => {
            refetch(vars, options);
          }),
        200
      ),
    []
  );

  const onSearchStringChanged = (value: string) => {
    setSearchString(value);
    refetchDebounced({ search: value });
  };

  return (
    <Card dim={true}>
      <h3>Contacts</h3>
      <SearchInput
        value={searchString}
        onChange={onSearchStringChanged}
        isPending={isPending}
      />

      {data.contacts.map((contact) => (
        <ContactRow key={contact.id} contact={contact} />
      ))}
    </Card>
  );
}
