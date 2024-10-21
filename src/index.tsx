import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { persistor, store } from './application/redux/rootState';
import { Provider } from 'react-redux';
import '~/presentation/assets/css/admin-style.css';
import '~/presentation/assets/css/styles.css';
import '~/presentation/assets/css/theme.css';
import '~/presentation/assets/vendor/fontawesome-free/css/all.min.css';
import '~/presentation/assets/js/jquery.min.js';
import '~/presentation/assets/vendor/bootstrap/js/bootstrap.bundle.min.js';
import '~/presentation/assets/css/loading.css';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <React.StrictMode>
                <App />
                <ToastContainer />
            </React.StrictMode>
        </PersistGate>
    </Provider>,
);
reportWebVitals();
