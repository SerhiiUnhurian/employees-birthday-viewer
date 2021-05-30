import Employees from './Employees';
import Birthdays from './Birthdays';
import clss from './EmployeesBirthdayView.module.css';

const EmployeesBirthdayView = () => {
  return (
    <div className={clss.container}>
      <section className={clss.employees}>
        <Employees />
      </section>
      <section className={clss.birthdays}>
        <Birthdays />
      </section>
    </div>
  );
};

export default EmployeesBirthdayView;
