import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type TContact, type TCreateContact } from '../utils/types';
import {
  getContactsApi,
  updateContactApi,
  createContactApi,
  deleteContactApi
} from '../utils/api'

interface IContactsState {
  contacts: TContact[];
  error: string | null;
  isReguest: boolean;
}

type UpdateArgs = {
  id: string;
  updatedContact: Partial<TContact>;
};

type CreateArgs = TCreateContact;

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const data = await getContactsApi();
    return data;
  }
);

export const fetchUpdateContact = createAsyncThunk(
  'contacts/fetchUpdateContact',
  async ({ id, updatedContact }: UpdateArgs, thunkAPI) => {
    try {
      const data = await updateContactApi(id, updatedContact);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchCreateContact = createAsyncThunk(
  'contacts/fetchCreateContact',
  async ( createdContact: CreateArgs, thunkAPI) => {
    try {
      const data = await createContactApi(createdContact);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchDeleteContact = createAsyncThunk(
  'contacts/fetchDeleteContact',
  async ( id: string, thunkAPI) => {
    try {
      const data = await deleteContactApi(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: IContactsState = {
  contacts: [],
  error: null,
  isReguest: false,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    clearErrorState: (sliceState) => {
      sliceState.error = null;
    },
    setError(sliceState, action: PayloadAction<string | null>) {
      sliceState.error = action.payload;
    },
  },

  selectors: {
    selectContacts: (sliceState) => sliceState.contacts,
    selectRequest: (sliceState) => sliceState.isReguest,
    selectError: (sliceState) => sliceState.error,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (sliceState) => {
        sliceState.isReguest = true;
      })
      .addCase(fetchContacts.rejected, (sliceState, action) => {
        sliceState.isReguest = false;
        sliceState.error = action.error.message ?? null;
      })
      .addCase(fetchContacts.fulfilled, (sliceState, action) => {
        sliceState.isReguest = false;
        sliceState.contacts = action.payload;
      })

      .addCase(fetchUpdateContact.pending, (sliceState) => {
        sliceState.isReguest = true;
      })
      .addCase(fetchUpdateContact.rejected, (sliceState, action) => {
        sliceState.isReguest = false;
        sliceState.error = action.error.message ?? null;
      })
      .addCase(fetchUpdateContact.fulfilled, (sliceState, action) => {
        sliceState.isReguest = false;

        const updatedContact = action.payload;
        const index = sliceState.contacts.findIndex(
          (contact) => contact._id === updatedContact._id
        );

        if (index !== -1) {
          sliceState.contacts[index] = updatedContact;
        }
      })

      .addCase(fetchCreateContact.pending, (sliceState) => {
        sliceState.isReguest = true;
      })
      .addCase(fetchCreateContact.rejected, (sliceState, action) => {
        sliceState.isReguest = false;
        sliceState.error = action.error.message ?? null;
      })
      .addCase(fetchCreateContact.fulfilled, (sliceState, action) => {
        sliceState.isReguest = false;
        sliceState.contacts.push(action.payload);
      })

      .addCase(fetchDeleteContact.pending, (sliceState) => {
        sliceState.isReguest = true;
      })
      .addCase(fetchDeleteContact.rejected, (sliceState, action) => {
        sliceState.isReguest = false;
        sliceState.error = action.error.message ?? null;
      })
      .addCase(fetchDeleteContact.fulfilled, (sliceState, action) => {
        sliceState.isReguest = false;
        const id = action.payload._id;
        sliceState.contacts = sliceState.contacts.filter(contact => contact._id !== id);
      })

  }
});

export const {
  selectContacts,
  selectRequest,
  selectError
} = contactsSlice.selectors;

export const {
  clearErrorState,
  setError
} = contactsSlice.actions;

export default contactsSlice.reducer;