import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import NotificationManager from '../src/containers/notification';
import ContactsTable from './containers/contactsTable';

describe('App test', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<App />);
    });

    describe('renders components', () => {
        it('should be in div which class name is "App"', () => {
            expect(wrapper.hasClass('App')).toEqual(true);
        });
        it('should have one NotificationManager and one ContactsTable in NotificationManager', () => {
            expect(wrapper.find(NotificationManager)).toHaveLength(1);
            expect(wrapper.find(NotificationManager).at(0).find(ContactsTable)).toHaveLength(1);
        });
    });
});
