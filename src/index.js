import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router}  from 'react-router-dom';

import { createRoot } from 'react-dom/client';
import { Provider} from 'react-redux';
import store from './store/index';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    // </React.StrictMode>
)