import moment from 'moment';
import { IEmployee } from '../interfaces';

type BirthdayItemProps = IEmployee;

const BirthdayItem = ({ lastName, firstName, dob }: BirthdayItemProps) => {
  return (
    <li>
      {`${lastName} ${firstName} - ${moment(dob).format(
        'D MMMM, YYYY [year]'
      )}`}
    </li>
  );
};

export default BirthdayItem;
