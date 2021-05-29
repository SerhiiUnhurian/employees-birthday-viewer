import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { getActiveEmployees } from '../store/employees';
import BirthdayGroup from './BirthdayGroup';

const NUM_OF_MONTHS = 12;

const groupByMonth = employees => {
  const employeeGroups = [];
  const offset = moment().month();

  for (let i = 0; i < NUM_OF_MONTHS; i++) {
    const numMonth = (i + offset) % NUM_OF_MONTHS;
    const filteredEmployees = employees
      .filter(empl => moment(empl.dob).month() === numMonth)
      .sort((a, b) => a.lastName.localeCompare(b.lastName));

    if (!filteredEmployees.length) continue;

    const group = {
      title: moment().month(numMonth).format('MMMM'),
      employees: filteredEmployees,
    };
    employeeGroups.push(group);
  }

  return employeeGroups;
};

const Birthdays = () => {
  const employees = useSelector(getActiveEmployees);
  const [birthdayGroups, setBirthdayGroups] = useState([]);

  useEffect(() => {
    const monthGroups = groupByMonth(employees);
    setBirthdayGroups(monthGroups);
  }, [employees]);

  return (
    <div>
      <h2>Employees Birthday</h2>
      <hr />
      {birthdayGroups.map(group => (
        <BirthdayGroup key={group.title} {...group} />
      ))}
    </div>
  );
};

export default Birthdays;
