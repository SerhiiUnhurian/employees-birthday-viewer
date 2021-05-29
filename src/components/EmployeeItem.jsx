import { useDispatch } from 'react-redux';
import { changeEmployeeStatus } from '../store/employees';

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
          not active
          <input
            type="radio"
            value="not-active"
            checked={!isActive}
            onChange={handleChange}
          />
        </label>
        <label>
          active
          <input
            type="radio"
            value="active"
            checked={isActive}
            onChange={handleChange}
          />
        </label>
      </div>
    </li>
  );
};

export default EmployeeItem;
