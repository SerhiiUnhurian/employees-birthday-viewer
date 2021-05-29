import './App.css';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import Employees from './components/Employees';
import Birthdays from './components/Birthdays';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Employees />
        <Birthdays />
      </div>
    </Provider>
  );
}

export default App;
