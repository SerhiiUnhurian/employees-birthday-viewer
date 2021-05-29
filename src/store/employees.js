import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import moment from 'moment';

const slice = createSlice({
  name: 'employees',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
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
      employees.lastFetch = Date.now();
    },
    employeeStatusChanged: (employees, action) => {
      const index = employees.list.findIndex(
        empl => empl.id === action.payload.id
      );
      employees.list[index].activeStatus = action.payload.status;
    },
    // employeeDeactivated: (employees, action) => {
    //   const index = employees.list.findIndex(
    //     empl => empl.id === action.payload.id
    //   );
    //   employees.list[index].activated = false;
    // },
  },
});

const {
  employeesRequested,
  employeesRequestFailed,
  employeesReceived,
  employeeStatusChanged,
  // employeeActivated,
  // employeeDeactivated,
} = slice.actions;

export default slice.reducer;

// Actions Creators
const url = '/users';
const cachingTimeInMinutes = 10;

export const loadEmployees = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.employees;
  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');

  if (diffInMinutes < cachingTimeInMinutes) return;

  dispatch(
    apiCallBegan({
      url,
      onStart: employeesRequested.type,
      onSuccess: employeesReceived.type,
      onError: employeesRequestFailed.type,
    })
  );
};

export const changeEmployeeStatus = (id, status) => (dispatch, getState) => {
  dispatch({ type: employeeStatusChanged.type, payload: { id, status } });
};

// export const activateEmployee = id => (dispatch, getState) => {
//   dispatch({ type: employeeActivated.type, payload: { id } });
// };

// export const deactivateEmployee = id => (dispatch, getState) => {
//   dispatch({ type: employeeDeactivated.type, payload: { id } });
// };

// Selectors
export const getEmployees = createSelector(
  state => state.entities.employees,
  employees => employees
);

export const getActiveEmployees = createSelector(
  state => state.entities.employees.list,
  employees => employees.filter(empl => empl.activeStatus === 'active')
);
