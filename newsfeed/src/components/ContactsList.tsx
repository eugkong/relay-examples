import * as React from "react";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import Card from "./Card";
import ContactRow from "./ContactRow";
import type { ContactsListFragment$key } from "./__generated__/ContactsListFragment.graphql";

export type Props = {
  viewer: ContactsListFragment$key;
};

const ContactsListFragment = graphql`
  fragment ContactsListFragment on Viewer {
    contacts {
      id
      ...ContactRowFragment
    }
  }
`;

export default function ContactsList({ viewer }: Props): React.ReactElement {
  const data = useFragment(ContactsListFragment, viewer);
  return (
    <Card dim={true}>
      <h3>Contacts</h3>
      {data.contacts.map((contact) => (
        <ContactRow key={contact.id} contact={contact} />
      ))}
    </Card>
  );
}
