import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import employeesReducer from './employees';

const employeesPersistConfig = {
  key: 'employees',
  storage: storage,
};

export default combineReducers({
  employees: persistReducer(employeesPersistConfig, employeesReducer),
});
