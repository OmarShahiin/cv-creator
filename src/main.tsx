import { AppThemeProvider } from './themes/AppThemeProvider';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store, { persistor } from './app/store';
import React from 'react';
import App from './App';
import './main.css';
import { PersistGate } from 'redux-persist/integration/react';
import './i18n'; // Import i18n configuration

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppThemeProvider>  
          <App />
        </AppThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
