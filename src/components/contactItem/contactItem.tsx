import './contactItem.css';
import type { TContact } from '../../utils/types';
import { useState, type FC} from 'react';
import { Modal } from '../modal/Modal';
import { EditContact } from '../editContact/editContact';
import { useDispatch } from '../../store/store';
import { clearErrorState } from '../../slices/contactsSlice';

type ContactItemProps = {
  contact: TContact;
};

export const ContactItem: FC<ContactItemProps> = ({ contact }) => {
  const[visisble, setVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(clearErrorState());
    setVisible(true);
  };
  const closeModal = () => setVisible(false);

  return (
    <>
      <li key={contact._id} onClick={openModal}>
        <div className="contact-card">
          <h3>{contact.name}</h3>
          <p>{contact.email}</p>
          <p>{contact.phone}</p>

          <div className="last-interaction">
            Последнее взаимодействие:{" "}
            {contact.lastInteraction
              ? new Date(contact.lastInteraction).toLocaleDateString()
              : "нет данных"}
          </div>
        </div>
      </li>

      <Modal onClose={closeModal} visible={visisble}>
        <EditContact contact={contact} onClose={closeModal} />
      </Modal>
   </>
  );
};