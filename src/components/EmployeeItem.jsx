import { useDispatch } from 'react-redux';
import { changeEmployeeStatus } from '../store/employees';
import PropTypes from 'prop-types';

const EmployeeItem = ({ id, firstName, lastName, activeStatus }) => {
  const dispatch = useDispatch();
  const isActive = activeStatus === 'active';

  const handleChange = e => {
    const activeStatus = e.target.value;
    dispatch(changeEmployeeStatus(id, activeStatus));
  };

  return (
    <li key={id}>
      <span
        style={{ color: isActive ? 'blue' : '' }}
      >{`${lastName} ${firstName}`}</span>
      <div>
        <label>
          <input
            type="radio"
            value="not-active"
            checked={!isActive}
            onChange={handleChange}
          />
          not active
        </label>{' '}
        <label>
          <input
            type="radio"
            value="active"
            checked={isActive}
            onChange={handleChange}
          />
          active
        </label>
      </div>
    </li>
  );
};

EmployeeItem.propTypes = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  activeStatus: PropTypes.string,
};

export default EmployeeItem;
