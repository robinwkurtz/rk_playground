import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as uiReducer } from 'redux-ui'

import i18nReducer from './i18n';
import ssrReducer from './ssr';
import pagesReducer from './pages';
import menuReducer from './menu';

/*
  This is our main app reducer.
  In addition to importing our own reducers, it adds reduxAsyncConnect and the routing reducer.
  Together, these reducers create the global state of our application.
*/
export default combineReducers({
    routing: routerReducer,
    reduxAsyncConnect,
    ui: uiReducer,
    pages: pagesReducer,
    menu: menuReducer,
    i18n: i18nReducer,
    ssr: ssrReducer
});
