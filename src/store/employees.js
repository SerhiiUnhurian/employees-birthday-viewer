import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';

const slice = createSlice({
  name: 'employees',
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    employeesRequested: (employees, action) => {
      employees.loading = true;
    },
    employeesRequestFailed: (employees, action) => {
      employees.loading = false;
    },
    employeesReceived: (employees, action) => {
      employees.list = action.payload;
      employees.loading = false;
    },
    employeeStatusChanged: (employees, action) => {
      const index = employees.list.findIndex(
        empl => empl.id === action.payload.id
      );
      employees.list[index].activeStatus = action.payload.status;
    },
  },
});

const {
  employeesRequested,
  employeesRequestFailed,
  employeesReceived,
  employeeStatusChanged,
} = slice.actions;

export default slice.reducer;

// Actions Creators
const url = '/users';

export const loadEmployees = () => (dispatch, getState) => {
  const { employees } = getState().entities;

  if (!employees.list.length) {
    dispatch(
      apiCallBegan({
        url,
        onStart: employeesRequested.type,
        onSuccess: employeesReceived.type,
        onError: employeesRequestFailed.type,
      })
    );
  }
};

export const changeEmployeeStatus = (id, status) => (dispatch, getState) => {
  dispatch({ type: employeeStatusChanged.type, payload: { id, status } });
};

// Selectors
export const getEmployees = createSelector(
  state => state.entities.employees,
  employees => employees
);

export const getActiveEmployees = createSelector(
  state => state.entities.employees.list,
  employees => employees.filter(empl => empl.activeStatus === 'active')
);
