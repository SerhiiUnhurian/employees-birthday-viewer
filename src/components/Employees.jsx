import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadEmployees, getEmployees } from '../store/employees';
import EmployeeGroup from './EmployeeGroup';
import Loading from './ui/Loading';

const LETTERS_IN_ALPHABET = 26;

const groupByAlphabet = employees => {
  const aCode = 'A'.charCodeAt(0);
  const employeeGroups = [];

  for (let i = 0; i < LETTERS_IN_ALPHABET; i++) {
    const currChar = String.fromCharCode(aCode + i);
    const filteredEmployees = employees
      .filter(empl => empl.lastName[0].toUpperCase() === currChar)
      .sort((a, b) => a.lastName.localeCompare(b.lastName));

    const group = {
      title: currChar,
      employees: filteredEmployees,
    };
    employeeGroups.push(group);
  }

  return employeeGroups;
};

const Employees = () => {
  const dispatch = useDispatch();
  const employees = useSelector(getEmployees);
  const [employeeGroups, setEmployeeGroups] = useState([]);

  useEffect(() => {
    dispatch(loadEmployees());
  }, [dispatch]);

  useEffect(() => {
    const groupsByAlphabet = groupByAlphabet(employees.list);
    setEmployeeGroups(groupsByAlphabet);
  }, [employees.list]);

  return employees.loading ? (
    <Loading />
  ) : (
    <section>
      <h2>Employees</h2>
      <hr />
      <div>
        {employeeGroups.map(group => (
          <EmployeeGroup key={group.title} {...group} />
        ))}
      </div>
    </section>
  );
};

export default Employees;
