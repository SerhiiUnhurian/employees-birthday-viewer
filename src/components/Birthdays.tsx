import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IEmployee, IEmployeeGroup } from '../interfaces';
import { getActiveEmployees } from '../store/employees';
import BirthdayGroup from './BirthdayGroup';
import clss from './Birthdays.module.css';

const NUM_OF_MONTHS = 12;

const groupByMonth = (employees: IEmployee[]) => {
  const employeeGroups: IEmployeeGroup[] = [];
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
  const [birthdayGroups, setBirthdayGroups] = useState<IEmployeeGroup[]>([]);

  useEffect(() => {
    const groupsByMonth = groupByMonth(employees);
    setBirthdayGroups(groupsByMonth);
  }, [employees]);

  return (
    <div>
      <div className={clss.title}>
        <h2>Employees Birthday</h2>
        <hr />
      </div>
      <div className={clss.birthdays}>
        {!birthdayGroups.length ? (
          <p>Employees List is empty.</p>
        ) : (
          birthdayGroups.map(group => (
            <BirthdayGroup key={group.title} {...group} />
          ))
        )}
      </div>
    </div>
  );
};

export default Birthdays;
