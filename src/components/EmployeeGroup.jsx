import PropTypes from 'prop-types';

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

EmployeeGroup.propTypes = {
  title: PropTypes.string.isRequired,
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    })
  ).isRequired,
};

export default EmployeeGroup;
