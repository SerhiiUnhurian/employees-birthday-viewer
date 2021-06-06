import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { IEmployee } from '../interfaces';
import { apiCallBegan } from './api';
import type { AppDispatch, RootState } from './store';

interface EmployeesState {
  list: IEmployee[];
  loading: boolean;
}

const initialState: EmployeesState = {
  list: [],
  loading: false,
};

const slice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    employeesRequested: employees => {
      employees.loading = true;
    },
    employeesRequestFailed: employees => {
      employees.loading = false;
    },
    employeesReceived: (employees, action) => {
      employees.list = action.payload;
      employees.loading = false;
    },
    employeeStatusChanged: (
      employees,
      action: PayloadAction<{ id: string; status: IEmployee['activeStatus'] }>
    ) => {
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

export const loadEmployees =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
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

export const changeEmployeeStatus =
  (id: string, status: string) => (dispatch: AppDispatch) => {
    dispatch({ type: employeeStatusChanged.type, payload: { id, status } });
  };

// Selectors
export const getEmployees = createSelector(
  (state: RootState) => state.entities.employees,
  employees => employees
);

export const getActiveEmployees = createSelector(
  (state: RootState) => state.entities.employees.list,
  employees => employees.filter(empl => empl.activeStatus === 'active')
);
