import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';

import configureStore from './store/configureStore';
import Loading from './components/ui/Loading';
import EmployeesBirthdayView from './components/EmployeesBirthdayView';

const store = configureStore();
const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <EmployeesBirthdayView />
      </PersistGate>
    </Provider>
  );
}

export default App;
