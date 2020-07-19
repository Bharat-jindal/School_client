import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';


import authReducer from './store/reducers/authReducer';
import schoolReducer from './store/reducers/schoolReducer';
import teacherReducer from './store/reducers/teacherReducer';
import feeRouter from './store/reducers/feesReducer';
import bookRouter from './store/reducers/bookReducer';
import studentReducer from './store/reducers/studentReducer';

const composeEnhancers = (process.env.NODE_ENV  ==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null)|| compose;

const rootReducer = combineReducers({
    auth:authReducer,
    school:schoolReducer,
    teacher:teacherReducer,
    fees:feeRouter,
    books:bookRouter,
    student:studentReducer
})

const store=createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)
));



const app= (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>   
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
