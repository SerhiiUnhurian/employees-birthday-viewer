import { IEmployeeGroup } from '../interfaces';
import BirthdayItem from './BirthdayItem';

type BirthdayGroupProps = IEmployeeGroup;

const BirthdayGroup = ({ title, employees }: BirthdayGroupProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {employees.map(employee => (
          <BirthdayItem key={employee.id} {...employee} />
        ))}
      </ul>
    </div>
  );
};

export default BirthdayGroup;
