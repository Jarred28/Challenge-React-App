import { createSlice } from '@reduxjs/toolkit';
import { setNotification } from './notification';
import { PAGE_SIZE } from '../constant';
import { ContactService } from '../services';

// Slice
const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    data: [],
    totalCounts: 0,
    isLoading: false,
    currentPage: 1,   
  },
  reducers: {
    startLoading: state => {
      state.isLoading = true;
    },  
    setCurrentPage: ( state, action ) => {
      state.currentPage = action.payload;
    },
    getContactsSuccess: (state, action) => {
      const { contacts, totalCounts } = action.payload;
      state.data = contacts;
      state.totalCounts = totalCounts;
      state.isLoading = false;
    },
    updateContactsSuccess: ( state, action) => {
      const { _id } = action.payload;
      const newData = [...state.data];
      const index = newData.findIndex((item) => _id === item._id);
      newData.splice(index, 1, action.payload);
      state.data = newData;
      state.isLoading = false;
    }
  },
});

export default contactSlice.reducer

//selector
export const contacts = (state) => state.contacts.data; 

//actions
export const { startLoading, setCurrentPage, getContactsSuccess, updateContactsSuccess } = contactSlice.actions

//action: getContacts
export const getContacts = (page, search) => async (dispatch) => {
  dispatch(startLoading());
  const { name, phoneNumber } = search;
  const params = {
    page,
    pageSize: PAGE_SIZE,
    name, //search_name
    phoneNumber //search_phoneNumber
  }
  try {
    const res = await ContactService.fetchContacts(params);
    dispatch(setCurrentPage(page));
    dispatch(getContactsSuccess(res.data));
  }
  catch (e) {
    const notification = {
      type: 'error',
      message: e.message
    }
    dispatch(setNotification(notification))
  }
}
//action: updateContact
export const updateContact = (id, data) => async (dispatch, getState) => {
  dispatch(startLoading());
  try {
    const res = await ContactService.editContact(id, data);
    const { message, updatedOne } = res.data;
    const notification = { type: 'success', message, createdAt: new Date().getTime() };
    dispatch(updateContactsSuccess(updatedOne));
    dispatch(setNotification(notification))
  }
  catch (e) {
    const notification = {
      type: 'error',
      message: !!e.response ? e.response.data.message : e.message,
      createdAt: new Date().getTime()
    }
    dispatch(setNotification(notification))
  }
}