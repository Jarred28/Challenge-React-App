import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { PAGE_SIZE } from '../constant';

import slice, {
  startLoading,
  setCurrentPage,
  getContactsSuccess,
  updateContactsSuccess,
  getContacts,
  updateContact
} from './contacts';
import { ContactService } from '../services';

jest.mock('../services', () => ({
  ContactService: {
    fetchContacts: jest.fn()
  }
}));

const mockStore = configureStore([thunk]);

describe('contacts reducer test', () => {
  let store;
  const initialState = {
    data: [],
    totalCounts: 0,
    isLoading: false,
    currentPage: 1,   
  };

  beforeEach(() => {
    store = mockStore({});
  });

  it('should handle initial state', () => {
    expect(slice(undefined, {})).toEqual(initialState);
  });

  it('shold set the isLoading state as true at the beginning', () => {
    const expected = {
      ...initialState,
      isLoading: true,
    };
    const nextState = slice(initialState, startLoading());
    expect(nextState).toEqual(expected);
  });


  describe('getContacts action', () => {
    const data = {
      contacts: [
        {
          _id: '001',
          name: 'John',
          phoneNumber: '000-000-0001'
        }, {
          _id: '002',
          name: 'Pete',
          phoneNumber: '000-000-0002'
        }
      ],
      totalCounts: 2
    };

    afterEach(() => {
      ContactService.fetchContacts.mockReset();
    });

    it('should call startLoading, setCurrentPage and getContactsSuccess reducer when ContactService action is successful', () => {
      ContactService.fetchContacts.mockImplementation(() => Promise.resolve({data}));
      return store.dispatch(getContacts(3, {name: 'John', phoneNumber: '000-111-2222'}))
        .then(() => {
          expect(ContactService.fetchContacts).toHaveBeenCalledWith({
            page: 3,
            pageSize: PAGE_SIZE,
            name: 'John',
            phoneNumber: '000-111-2222'
          });
          expect(store.getActions().length).toBe(3);
          expect(store.getActions()[0]).toEqual({ type: 'contacts/startLoading', payload: undefined });
          expect(store.getActions()[1]).toEqual({ type: 'contacts/setCurrentPage', payload: 3 });
          expect(store.getActions()[2]).toEqual({ type: 'contacts/getContactsSuccess', payload: data });
        });
    });
    it('should call startLoading, setNotification reducer when ContactService action is NOT successful', () => {
      ContactService.fetchContacts.mockImplementation(() => Promise.reject(new Error('Error 001')));
      return store.dispatch(getContacts(1, {name: 'Pete', phoneNumber: '000-111-1111'}))
        .then(() => {
          expect(ContactService.fetchContacts).toHaveBeenCalledWith({
            page: 1,
            pageSize: PAGE_SIZE,
            name: 'Pete',
            phoneNumber: '000-111-1111'
          });
          expect(store.getActions().length).toBe(2);
          expect(store.getActions()[0]).toEqual({ type: 'contacts/startLoading', payload: undefined });
          expect(store.getActions()[1]).toEqual({ type: 'notification/setNotification', payload: { type: 'error', message: 'Error 001' } });
        });
    });
  });
});
