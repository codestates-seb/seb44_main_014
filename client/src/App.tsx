import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { store } from './store/store.ts';
import Header from './components/layout/Header.tsx';
import Footer from './components/layout/Footer.tsx';
import PageRouter from './pages/PageRouter.tsx';
import './App.css';
import GlobalStyle from './styles/GlobalStyle.tsx';

export const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <Header />
        <PageRouter />
        <Footer />
      </PersistGate>
    </Provider>
  );
}

export default App;
