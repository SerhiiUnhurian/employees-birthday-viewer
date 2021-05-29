import EmployeeItem from './EmployeeItem.jsx';

const EmployeeGroup = ({ title, employees }) => {
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
