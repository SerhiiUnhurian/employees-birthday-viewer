import EmployeeItem from './EmployeeItem';
import { IEmployeeGroup } from '../interfaces';

const EmployeeGroup = ({ title, employees }: IEmployeeGroup) => {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {employees.length ? (
          employees.map(emp => <EmployeeItem key={emp.id} {...emp} />)
        ) : (
          <span>---</span>
        )}
      </ul>
    </div>
  );
};

export default EmployeeGroup;
