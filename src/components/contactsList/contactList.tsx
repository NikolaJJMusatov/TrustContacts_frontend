import './contactsList.css';
import type { TContact } from '../../utils/types';
import type { FC } from 'react';
import { useState } from 'react';
import { ContactItem } from '../contactItem/contactItem';
import { AddContactCard } from '../addContactCard/addContactCard';
import { Modal } from '../modal/Modal';
import { useDispatch } from 'react-redux';
import { clearErrorState } from '../../slices/contactsSlice';
import { CreateContact } from '../createContact/createContact';

type ContactsListProps = {
  contacts: TContact[];
};

export const ContactsList: FC<ContactsListProps> = ({ contacts }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const[visisble, setVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(clearErrorState());
    setVisible(true);
  };
  const closeModal = () => setVisible(false);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="contacts-wrapper">
      <input
        type="text"
        placeholder="Поиск по имени..."
        className="contacts-search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <ul className="contacts-list">
        <AddContactCard onClick={openModal}/>
        
        {filteredContacts.map((contact) => (
          <ContactItem key={contact._id} contact={contact} />
        ))}
        {filteredContacts.length === 0 && <p className="contacts-search-info">Ничего не найдено</p>}
      </ul>

      <Modal onClose={closeModal} visible={visisble}>
        <CreateContact onClose={closeModal} />
      </Modal>
    </div>
  );
};