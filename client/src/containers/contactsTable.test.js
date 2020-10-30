import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import '../mocks/matchMedia.mock';

import ContactsTable from './contactsTable';
import SearchBar from '../components/searchbar';
import { getContacts, updateContact } from '../reducers/contacts';

// Mock store
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

// Mock actions
jest.mock('../reducers/contacts');

describe('table container test', () => {
  let wrapper;
  let props;
  const contacts = [
    {
      _id: '001',
      name: 'John',
      phoneNumber: '000-000-0001'
    }, {
      _id: '002',
      name: 'Pete',
      phoneNumber: '000-000-0002'
    }
  ];
  const store = mockStore({
    contacts: {
      data: contacts,
      isLoading: false,
      search: {
        name: '',
        phoneNumber: ''
      }
    }
  });

  beforeEach(() => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch'); 
    const mockDispatchFn = jest.fn()
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    // const mockUseEffect = jest.fn();
    // React.useEffect = mockUseEffect;

    getContacts.mockImplementation(() => contacts);

    wrapper = mount(
      <Provider store={store}>
        <ContactsTable />
      </Provider>
    );
  });

  it('shallow wrapper instance should be null since stateless', () => {
    const instance = wrapper.instance();
    expect(instance).toEqual(null);
  });
  it('loads the contacts', () => {
    expect(getContacts).toHaveBeenCalled();
  });
  it('should have one antd table which has 4 columns', () => {
    const antdTables = wrapper.find('.ant-table');
    expect(antdTables).toHaveLength(1);
    const headers = antdTables.at(0).find('thead.ant-table-thead');
    expect(headers).toHaveLength(1);
    const headerColumns = headers.at(0).find('th.ant-table-cell');
    expect(headerColumns).toHaveLength(4);
  });
  it('should have SearchBar component on only 2nd and 3rd header columns', () => {
    const antdTables = wrapper.find('.ant-table');
    const headers = antdTables.at(0).find('thead.ant-table-thead');
    const headerColumns = headers.at(0).find('th.ant-table-cell');
    expect(headerColumns.at(0).find(SearchBar)).toHaveLength(0);
    expect(headerColumns.at(1).find(SearchBar)).toHaveLength(1);
    expect(headerColumns.at(2).find(SearchBar)).toHaveLength(1);
    expect(headerColumns.at(3).find(SearchBar)).toHaveLength(0);
  });

  it('should hide itself and show `Save` and `Cancel` button on the same cell when click `Edit` button', () => {
    let antdTables = wrapper.find('.ant-table');
    let firstOperationDiv = antdTables.at(0).find("tr.ant-table-row").at(0).find("div.operation").at(0);
    let firstEditBtn = firstOperationDiv.children().at(0);

    expect(firstOperationDiv.children()).toHaveLength(1);
    expect(firstEditBtn.text()).toEqual('Edit');

    // Click!
    firstEditBtn.simulate('click');

    antdTables = wrapper.find('.ant-table');
    firstOperationDiv = antdTables.at(0).find("tr.ant-table-row").at(0).find("div.operation").at(0);
    expect(firstOperationDiv.children()).toHaveLength(2);
    expect(firstOperationDiv.children().at(0).text()).toEqual('Save');
    expect(firstOperationDiv.children().at(1).text()).toEqual('Cancel');
  });

  it('should call getContacts() with "name" search params when try to search on name SearchBar', () => {
    let antdTables = wrapper.find('.ant-table');
    let headers = antdTables.at(0).find('thead.ant-table-thead');
    let headerColumns = headers.at(0).find('th.ant-table-cell');
    let searchByNameInput = headerColumns.at(1).find('input').at(0);

    // Input 'abc'!
    const event = {target: {field: "name", value: "abc"}};
    searchByNameInput.simulate('change', event);

    wrapper.update()
    antdTables = wrapper.find('.ant-table');
    headers = antdTables.at(0).find('thead.ant-table-thead');
    headerColumns = headers.at(0).find('th.ant-table-cell');
    searchByNameInput = headerColumns.at(1).find('input').at(0);
    expect(searchByNameInput.instance().value).toEqual('abc');
    let searchBtn = headerColumns.at(1).find('button').at(0);

    // click!
    searchBtn.simulate('click');

    expect(getContacts).toHaveBeenCalledWith(1, { name: 'abc', phoneNumber: '' });
  });

  ///
  // add more cases for this search button
  ///

  ///
  // add more cases for pagination
  ///
});
