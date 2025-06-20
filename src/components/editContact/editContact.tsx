import './editContact.css';
import { useState } from 'react';
import type { FC } from 'react';
import type { TContact } from '../../utils/types';
import { fetchUpdateContact, clearErrorState, selectError, setError, fetchDeleteContact } from '../../slices/contactsSlice'
import { useDispatch, useSelector } from '../../store/store';

type TEditContactProps = {
  contact: TContact;
  onClose: () => void;
};

export const EditContact: FC<TEditContactProps> = ({ contact, onClose }) => {
  
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phone);
  const [tags, setTags] = useState(contact.tags?.join(', ') || '');

  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearErrorState());
    const updatedContact: Partial<TContact> = {};
    if (name !== contact.name) updatedContact.name = name;
    if (email !== contact.email) updatedContact.email = email;
    if (phone !== contact.phone) updatedContact.phone = phone;
    if (tags !== contact.tags?.join(', ')) {
      updatedContact.tags = tags.split(',').map((t) => t.trim());
    }
    if (Object.keys(updatedContact).length === 0) {
      dispatch(setError('Нет изменений'));
      return;
    }

    updatedContact.lastInteraction = new Date().toISOString();

    const result = await dispatch(fetchUpdateContact({ id: contact._id, updatedContact }));

    if (fetchUpdateContact.fulfilled.match(result)) {
      onClose();
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Удалить этот контакт?');
      if (!confirmDelete) return;

    const result = await dispatch(fetchDeleteContact(contact._id));
    if (fetchDeleteContact.fulfilled.match(result)) {
      onClose();
    }
  };

  return (
    <>
      <form
        className="form-edit-contact"
        name="form-edit-contact"
        onSubmit={handleSubmit}
      >
        <h2 className="form-title">Редактировать контакт</h2>

        <div className="form-group">
          <label htmlFor="name">Имя</label>
          <input
            className="form-edit-contact-input"
            type="text"
            id="name"
            placeholder="Имя"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="form-edit-contact-input"
            type="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Телефон</label>
          <input
            className="form-edit-contact-input"
            type="tel"
            id="phone"
            placeholder="Телефон"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Теги (через запятую)</label>
          <input
            className="form-edit-contact-input"
            type="text"
            id="tags"
            placeholder="например: друг, работа"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </div>

        {error && (
          <p className='form-edit-contact-error'>
            {error}
          </p>
        )}

        <button type="submit" className="form-edit-contact-button">
          Сохранить
        </button>
        
      </form>
      <button
        type="button"
        className="form-edit-contact-button-delete"
        onClick={handleDelete}
      >
        Удалить контакт ?
      </button>
    </>
  );
};