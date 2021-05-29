import BirthdayItem from './BirthdayItem';

const BirthdayGroup = ({ title, employees }) => {
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
