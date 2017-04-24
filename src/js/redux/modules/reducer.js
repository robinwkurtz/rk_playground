import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as uiReducer } from 'redux-ui'

import ssrReducer from 'ssr';
import pagesReducer from 'pages';
import menuReducer from 'menu';
import siteInformationReducer from 'site';

/*
  This is our main app reducer.
  In addition to importing our own reducers, it adds reduxAsyncConnect and the routing reducer.
  Together, these reducers create the global state of our application.
*/
export default combineReducers({
    routing: routerReducer,
    reduxAsyncConnect,
    ui: uiReducer,
    site: siteInformationReducer,
    pages: pagesReducer,
    menu: menuReducer,
    ssr: ssrReducer
});
