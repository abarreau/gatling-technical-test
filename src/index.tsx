import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { pipe } from 'fp-ts/function';
import { fold, fromNullable } from 'fp-ts/Either';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

pipe(
    fromNullable(null)(document.getElementById('root')),
    fold(
        () => console.error('Could not find root node of document. Aborting execution.'),
        (el: HTMLElement) => {
            const root = createRoot(el);
            root.render(
                <React.StrictMode>
                    <Provider store={store}>
                        <BrowserRouter>
                            <App/>
                        </BrowserRouter>
                    </Provider>
                </React.StrictMode>);
        }
    )
);
