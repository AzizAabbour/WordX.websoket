import { Provider } from 'react-redux';
import { store } from './store/store';
import { I18nProvider } from './i18n/i18n';
import AppRouter from './router/Router';
import ToastContainer from './components/Toast/ToastContainer';

import './styles/variables.css';
import './styles/reset.css';
import './styles/global.css';
import './styles/print.css';

export default function App() {
  return (
    <Provider store={store}>
      <I18nProvider>
        <AppRouter />
        <ToastContainer />
      </I18nProvider>
    </Provider>
  );
}
