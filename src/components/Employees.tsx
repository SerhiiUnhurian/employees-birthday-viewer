import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { IEmployee, IEmployeeGroup } from '../interfaces';
import { getEmployees, loadEmployees } from '../store/employees';
import EmployeeGroup from './EmployeeGroup';
import clss from './Employees.module.css';
import Loading from './ui/Loading';

const LETTERS_IN_ALPHABET = 26;

const groupByAlphabet = (employees: IEmployee[]) => {
  const aCode = 'A'.charCodeAt(0);
  const employeeGroups: IEmployeeGroup[] = [];

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
  const dispatch = useAppDispatch();
  const employees = useAppSelector(getEmployees);
  const [employeeGroups, setEmployeeGroups] = useState<IEmployeeGroup[]>([]);

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
    <div>
      <div className={clss.title}>
        <h2>Employees</h2>
        <hr />
      </div>
      <div className={clss.employees}>
        {employeeGroups.map(group => (
          <EmployeeGroup key={group.title} {...group} />
        ))}
      </div>
    </div>
  );
};

export default Employees;
