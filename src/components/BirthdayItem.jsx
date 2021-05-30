import moment from 'moment';
import PropTypes from 'prop-types';

const BirthdayItem = ({ lastName, firstName, dob }) => {
  return (
    <li>
      {`${lastName} ${firstName} - ${moment(dob).format(
        'D MMMM, YYYY [year]'
      )}`}
    </li>
  );
};

BirthdayItem.propTypes = {
  lastName: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  dob: PropTypes.string.isRequired,
};

export default BirthdayItem;
