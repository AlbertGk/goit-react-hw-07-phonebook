export const ContactList = ({ contacts, filter, deletionHandler }) => {
  console.log('contacts', contacts.items);
  return (
    <ul>
      {
        { filter } === ''
        ?
          contacts.items.map(contact => (
            <li key={contact.id}>
              {contact.name}: {contact.number}
              <button type="button" onClick={() => deletionHandler(contact.id)}>
                Delete
              </button>
            </li>
          ))
          : contacts.items
              .filter(contact =>
                contact.name.toLowerCase().includes(filter.toLowerCase())
              )
              .map(contact => (
                <li key={contact.id}>
                  {contact.name}: {contact.number}
                  <button
                    type="button"
                    onClick={() => deletionHandler(contact.id)}
                  >
                    Delete
                  </button>
                </li>
        ))
      }
    </ul>
  );
};
