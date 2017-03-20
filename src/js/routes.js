import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './pages/App/';
import HomePage from './pages/HomePage/';
import GeneralPage from './pages/GeneralPage/';

import { switchLanguage } from 'i18n';
import { load as loadMenu } from 'menu';

/*
Instead of directly defining our app routes, we have to export a function that receives the store.
When creating routes, as we do in the app.js on the client and server.js on the server, we need
access to the store in order to dispatch a switchLanguage action. At the moment, the router seems
like the best place to do it, specifically in the onEnter hook.
*/

export default function createRoutes(store) {
    return (
        <Route path="/" component={App}>
            <Route path="fr" onEnter={() => store.dispatch(switchLanguage('fr'))}>
                <IndexRoute component={HomePage} />
            </Route>
            <Route onEnter={() => store.dispatch(switchLanguage('en'))}>
                <IndexRoute component={HomePage} />
                <Route path="about-me" component={GeneralPage} />
                <Route path="what-i-do" component={GeneralPage} />
                <Route path="contact-me" component={GeneralPage} />
            </Route>
        </Route>
    );
}
