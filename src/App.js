import './App.css';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';

import configureStore from './store/configureStore';
import Employees from './components/Employees';
import Birthdays from './components/Birthdays';
import Loading from './components/ui/Loading';

const store = configureStore();
const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Employees />
          <Birthdays />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
