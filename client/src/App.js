import React from 'react';
import ContactsTable from './containers/contactsTable';
import './App.css';
import NotificationManager from '../src/containers/notification';

function App() {
  return (
    <div className="App">
      <NotificationManager>
        <div className="main">
          <ContactsTable />
        </div>
      </NotificationManager>
    </div>
  );
}

export default App;
