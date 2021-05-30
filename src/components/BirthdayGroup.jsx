import PropTypes from 'prop-types';

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

BirthdayGroup.propTypes = {
  title: PropTypes.string.isRequired,
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      dob: PropTypes.string,
    })
  ).isRequired,
};

export default BirthdayGroup;
