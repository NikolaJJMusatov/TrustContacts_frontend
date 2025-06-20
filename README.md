# Тестовое задание

Веб-приложение TrustContacts — простейший менеджер контактов:
1. список контактов;
2. создание, редактирование, удаление;
3. пометка даты последнего взаимодействия;
4. поиск/фильтр по имени.

## Установка

### Фронтенд
Создайте `.env` файл, в нём укажите:

* VITE_API_ORIGIN=http://localhost:3000
* VITE_TOKEN=test

Установите зависимости

`npm i`

Запустите фронтенд:

`npm run dev`

### Бэкенд
Создайте `.env` файл, в нём укажите:

* DATABASE_URL=mongodb://localhost:27017/trust-contacts
* ORIGIN_ALLOW=http://localhost:8000
* VALID_TOKEN=test

Установите зависимости

`npm i`

Запустите фронтенд:

`npm run start`

### MongoDB

Установите MongoDB скачав дистрибутив с официального сайта или с помощью пакетного менеджера вашей ОС.

## ⭐

1. Деплой приложения: 

- 🧠 Backend API (NestJS): [https://trustcontacts.onrender.com](https://trustcontacts.onrender.com)
- 💻 Frontend (Vite + React): [https://trust-contacts.vercel.app](https://trust-contacts.vercel.app)

2. Nest.js на бэке

## Что можно лучше

Затраченное время на работу 7-8 часов.
Можно улучшить:
1. валидация инпутов на клиенте
2. визуализация ошибок на фронтенде
3. запаковать все в Docker
4. дизайн фронтенда
5. SEO в HEAD
