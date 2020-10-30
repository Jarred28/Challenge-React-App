import { combineReducers } from 'redux';
import contacts from './contacts';
import notification from './notification';

const reducer = combineReducers({
  contacts,
  notification
})

export default reducer