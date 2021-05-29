import moment from 'moment';

const BirthdayItem = ({ lastName, firstName, dob }) => {
  return (
    <li>
      {`${lastName} ${firstName} - ${moment(dob).format(
        'D MMMM, YYYY [year]'
      )}`}
    </li>
  );
};

export default BirthdayItem;
