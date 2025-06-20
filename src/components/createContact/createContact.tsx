import './createContact.css';
import { useState } from 'react';
import type { FC } from 'react';
import { clearErrorState, selectError, fetchCreateContact } from '../../slices/contactsSlice'
import { useDispatch, useSelector } from '../../store/store';

type TCreateContactProps = {
  onClose: () => void;
};

export const CreateContact: FC<TCreateContactProps> = ({onClose }) => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tags, setTags] = useState('');

  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearErrorState());

    const result = await dispatch(
      fetchCreateContact({ 
        name: name,
        phone: phone,
        email: email,
        tags: tags.split(',').map((t) => t.trim()),
        lastInteraction: new Date().toISOString()
      })
    );

    if (fetchCreateContact.fulfilled.match(result)) {
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
        <h2 className="form-title">Создать контакт</h2>

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
    </>
  );
};