import { useState, useEffect, useRef } from 'react';

import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { saveInLocalStorage, loadFromLocalStorage } from 'api/localStorage';
import { useDispatch, useSelector } from 'react-redux';
// import { RemoveButton } from 'components/RemoveButton';
import {
  addContact,
  filterContacts,
  deleteContact,
  addFromLocalStorage,
} from '../store/actions';

export const App = () => {
  // const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  // const [filter, setFilter] = useState('');
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

   const setContactsFromLs = payload => dispatch(addFromLocalStorage(payload));
   //const contacts = useSelector(state => state.contacts);
  
  useEffect(() => {
    const storageArray = loadFromLocalStorage('contacts');
    if (storageArray?.length) {
      setContactsFromLs(storageArray);
      // console.log(`loadDM: ${contacts}`);
      // console.log(`lenDM: ${contacts.length}`);
      console.log('storageArray', storageArray);
      // dispatch(addContact(storageArray));
    }
    inputRef.current.focus();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (name === '') {
    saveInLocalStorage('contacts', contacts.items);
    console.log(`saveDU: ${contacts}`);
    console.log(`lenDU: ${contacts.length}`);
    }
  }, [contacts]);

  // componentDidMount() {
  //   const storageArray = loadFromLocalStorage('contacts');
  //   if (storageArray) {
  //     this.setState({ contacts: storageArray });
  //     console.log(`load: ${this.state.contacts}`);
  //     console.log(`len: ${this.state.contacts.length}`);
  //   }
  // }

  // componentDidUpdate() {
  //   if (this.state.name === '') {
  //     saveInLocalStorage('contacts', this.state.contacts);
  //     console.log(`save: ${this.state.contacts}`);
  //     console.log(`len: ${this.state.contacts.length}`);
  //   }
  // }

  const handleSubmit = ev => {
    ev.preventDefault();
    if (contacts.items.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      const newList = { id: nanoid(), name: name, number: number };
      console.log('new List', newList);
      setContacts(newList);

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
    //const newContacts = contacts.items.filter(contact => contact.id !== id);
    //setContacts(newContacts);
    setDeletion(id);
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
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
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
