import { useState, useEffect, useRef } from 'react';

import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { useDispatch, useSelector } from 'react-redux';
// import { RemoveButton } from 'components/RemoveButton';
import {
  addContact,
  filterContacts,
  deleteContact,
} from '../store/actions';

import { fetchContacts, removeContact, saveContact } from '../store/reducers';


export const App = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const inputRef = useRef();
  const nameId = useRef(nanoid());
  const numberId = useRef(nanoid());
  const filterId = useRef(nanoid());

  const dispatch = useDispatch();
  const setContacts = payload => dispatch(addContact(payload)); 
  const contacts = useSelector(state => state.contacts);

  const setFilter = payload => dispatch(filterContacts(payload));
  const filter = useSelector(state => state.contacts.filter);

  const setDeletion = payload => dispatch(deleteContact(payload));

  const getContactsFromApi = () => dispatch(fetchContacts());

  const saveContactInApi = payload => dispatch(saveContact(payload));
  const removeContactFromApi = payload => dispatch(removeContact(payload));

  useEffect(() => {
    getContactsFromApi();
    inputRef.current.focus();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // eslint-disable-next-line 
  }, [contacts]);


  const handleSubmit = ev => {
    ev.preventDefault();
    if (contacts.items.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      const newList = { id: nanoid(), name: name, number: number };
      console.log('new List', newList);
      setContacts(newList);
      saveContactInApi(newList);

      setName('');
      setNumber('');
    }
  };

  const handleSetName = ev => {
    setName(ev.target.value);
  };

  const handleSetNumber = ev => {
    setNumber(ev.target.value);
  };

  const handleSetFilter = ev => {
    setFilter(ev.target.value);
  };

  const deletionHandler = id => {
    setDeletion(id);
    removeContactFromApi(id);
  };

  return (
    <>
      <h1>Phonebook</h1>
      <form onSubmit={handleSubmit}>
        <ContactForm
          inputRef={inputRef}
          formId={nameId.current}
          type="text"
          inputName="Name"
          value={name}
          setName={handleSetName}
          pattern="^[a-zA-Z??-????-??]+(([' -][a-zA-Z??-????-?? ])?[a-zA-Z??-????-??]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        />
        <ContactForm
          formId={numberId.current}
          type="tel"
          inputName="Number"
          value={number}
          setName={handleSetNumber}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        />
        <button type="submit">Add contact</button>
      </form>
      <h1>Contacts</h1>
      <Filter
        setName={handleSetFilter}
        inputId={filterId.current}
        type="text"
        inputName="Filter"
        value={filter}
      />
      <ContactList
        contacts={contacts}
        filter={filter}
        deletionHandler={deletionHandler}
      />
    </>
  );
};
