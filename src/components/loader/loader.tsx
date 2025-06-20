import { type FC } from 'react';
import './loader.css';

export const Loader: FC = () => {
  return (
    <div className="loader-container">
      <div className="loader-spinner" />
      <p className="loader-text">Загрузка...</p>
    </div>
  );
};