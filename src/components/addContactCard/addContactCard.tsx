import type { FC } from "react";
import './addContactCard.css';

type AddContactCardProps = {
  onClick: () => void;
};

export const AddContactCard: FC<AddContactCardProps> = ({ onClick }) => (
  <li onClick={onClick} className="contact-card contact-card--add">
    <div className="add-contact-content">
      <span className="add-icon">＋</span>
      <span>Добавить контакт</span>
    </div>
  </li>
);
