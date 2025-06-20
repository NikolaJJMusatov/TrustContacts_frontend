import { useEffect } from 'react';
import './App.css'
import { ContactsList } from './components/contactsList/contactList'
import { fetchContacts, selectContacts, selectRequest } from './slices/contactsSlice';
import { useDispatch, useSelector } from './store/store';
import { Loader } from './components/loader/loader';

function App() {

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const isRequest = useSelector(selectRequest);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  
  return (
    <>
      {isRequest ? <Loader /> : <ContactsList contacts={contacts} />}
    </>
  )
}

export default App
