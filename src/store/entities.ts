import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import employeesReducer from './employees';

const employeesPersistConfig = {
  key: 'employees',
  storage: storage,
};

export default combineReducers({
  employees: persistReducer(employeesPersistConfig, employeesReducer),
});
