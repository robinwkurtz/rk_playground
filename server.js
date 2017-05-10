// Define some global constants. The client defines the opposite values
global.__CLIENT__ = false;
global.__SERVER__ = true;

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';

import makeStore from './src/js/redux/store';
import createRoutes from './src/js/routes';

import bodyParser from 'body-parser';

import { SMTP } from 'lock';

export default function server(parameters) {

    const SMTPuser = process.env.SMTPUSER || SMTP.user;
    const SMTPpass = process.env.SMTPPASS || SMTP.password;
    const SMTPhost = process.env.SMTPHOST || SMTP.host;
    const SMTPssl = process.env.SMTPSSL || SMTP.ssl;

    const app = express();
    app.set('view engine', 'ejs');

    if (__PROD__) {
        app.use('/assets', express.static('./build/assets'));
    }

    // Adds support for JSON-encoded bodies used in POST requests
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // Processes the form submission
    app.post('/send', function (req, res) {
        const email = require('emailjs/email');
        const server = email.server.connect({
            user: SMTPuser,
            password: SMTPpass,
            host: SMTPhost,
            ssl: true,
            tls: true,
            port: 465,
            timeout: 30000
        });

        console.log(server);

        // Build you html for email
        const message = '<html><body>' +
    		'<table width="700" border="0" cellspacing="0" cellpadding="0">' +
    		'<tr><td>&nbsp;</td><td>&nbsp;</td></tr>' +
    		'<tr>' +
    		'<td width="250"><strong>First Name</strong></td>' +
    		'<td width="450">' + req.body.fname + '</td>' +
    		'</tr>' +
    		'<tr><td>&nbsp;</td><td>&nbsp;</td></tr>' +
            '<tr>' +
    		'<td width="250"><strong>Last Name</strong></td>' +
    		'<td width="450">' + req.body.lname + '</td>' +
    		'</tr>' +
            '<tr><td>&nbsp;</td><td>&nbsp;</td></tr>' +
            '<tr>' +
    		'<td width="250"><strong>Email</strong></td>' +
    		'<td width="450">' + req.body.email + '</td>' +
    		'</tr>' +
            '<tr><td>&nbsp;</td><td>&nbsp;</td></tr>' +
            '<tr>' +
    		'<td width="250"><strong>Phone Number</strong></td>' +
    		'<td width="450">' + req.body.phone + '</td>' +
    		'</tr>' +
            '<tr><td>&nbsp;</td><td>&nbsp;</td></tr>' +
            '<tr>' +
    		'<td width="250"><strong>Message</strong></td>' +
    		'<td width="450">' + req.body.message + '</td>' +
    		'</tr>' +
            '<tr>' +
    		'<td>&nbsp;</td>' +
    		'</tr>' +
    		'</table>' +
    		'</html></body>';


        // If required (string) is passed to POST
        // Loop over values, if value.length < 1 then sendEmail = false
        let sendEmail = true;
        if (req.body.required) {
            const requiredFields = req.body.required.split(',');
            for (var i = 0; i < requiredFields.length; i++) {
                const value = req.body[requiredFields[i]].trim();
                if (value.length < 1) {
                    sendEmail = false;
                    break;
                }
            }
        }

        if (sendEmail) {
            server.send({
                'text': req.body,
                'from': req.body.email,
                'to': 'hello@robinwkurtz.com',
                'reply-to': req.body.email,
                'subject': `Contact Form Submission (${req.headers.host})`,
                attachment: [{data: message, alternative: true}]
            }, function(error, message) {
                if (error) {
                    console.log(error);
                    return res.send({status: 'KO'});
                } else {
                    console.log(message);
                    return res.send({status: 'OK'});
                }
            });
        } else {
            return res.send({status: 'ERROR'});
        }
    });

    /*
    This will be the most visited route of our application: it responds to all paths.
    For each request that comes to our web server, we will create a new store.
    Then, using the match function of react-router, we will receive the tree of components
    to render for the current request URL. <Redirect> routes will result in HTTP 302 responses.
    Regular routes will result in a call to the loadOnServer function from redux-connect. This
    call will return a Promise that is resolved when all the Promises specified in all the
    wrapped components are resolved. For an example of this, see how the <Home> component loads its data.
    */
    app.get('/*', (req, res) => {
        const memHistory = createHistory(req.originalUrl);
        const store = makeStore(memHistory);
        const history = syncHistoryWithStore(memHistory, store);
        const routes = createRoutes(store);

        match({ history, routes, location: req.originalUrl }, (err, redirectLocation, renderProps) => {
            if (redirectLocation) {
                res.redirect(redirectLocation.pathname + redirectLocation.search);
            } else if (err) {
                console.error('ROUTER ERROR:', error);
                res.status(500);
            } else if (renderProps) {
                loadOnServer({...renderProps, store})
                .then(() => {
                    // Check if there's a 404 after loading data on server
                    if (store.getState().ssr.error404) {
                        res.status(404);
                    }

                    var html;
                    try {
                        html = renderToString(
                            <Provider store={store} key="provider">
                                <ReduxAsyncConnect {...renderProps} />
                            </Provider>
                        );
                    }
                    catch(e) {
                        html = '';
                    }

                    const head = Helmet.rewind();
                    const title = head.title.toString();
                    const meta = head.meta.toString();
                    const link = head.link.toString();

                    const chunks = parameters.chunks();
                    const appJs = chunks && chunks.javascript && chunks.javascript.main;
                    const appCss = chunks && chunks.styles && chunks.styles.main;

                    res.render('index', {html, title, meta, link, store, appCss, appJs});
                })
                .catch(err => {
                    console.error(err.stack);
                    res.status(500);
                    if (__DEV__) {
                        res.send(err.stack);
                    }
                    else {
                        res.send('Server Error');
                    }
                });
            } else {
                res.status(404).send('Not Found');
            }
        });

    });

    const server = require('http').createServer(app);
    const PORT = process.env.PORT || 3000;
    const IP = process.env.IP || '0.0.0.0';

    server.listen(PORT, IP, function(err) {
        if (err) {
            console.log(err.stack);
        }
        else {
            console.log("Server listening on http://%s:%s", server.address().address, server.address().port);
        }
    });
}
