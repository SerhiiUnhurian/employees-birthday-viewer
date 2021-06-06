import React from 'react';
import { useAppDispatch } from '../hooks';
import { IEmployee } from '../interfaces';
import { changeEmployeeStatus } from '../store/employees';

type EmployeeItemProps = { activeStatus?: 'active' | 'not-active' } & IEmployee;

const EmployeeItem = ({
  id,
  firstName,
  lastName,
  activeStatus = 'not-active',
}: EmployeeItemProps) => {
  const dispatch = useAppDispatch();
  const isActive = activeStatus === 'active';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

export default EmployeeItem;
