import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { injectIntl, intlShape, IntlProvider } from 'react-intl';
import classNames from 'classnames';

import config from 'config';
import Loading from 'loading';
import Header from 'header';
import LanguageSwitcher from 'languageSwitcher';

import { load as loadMenu } from 'menu';
import { loadSingle } from 'pages';

import style from './index.scss';
import gstyles from 'gstyles';


/*
This component wraps the app in a react-intl provider
It also reacts to changes in the current language and reconfigures the IntlProvider appropriately
Finally, it displays the Loading bar, the base Helmet config for <head> and the router children
*/
class App extends Component {
	render() {
		const { i18n, children, menu, page } = this.props;
		console.log('App', this.props);
		return (
			<IntlProvider locale={ i18n.language } messages={ i18n.messages }>
				<main className={ classNames((menu.open) ? [style.main, style.isactive] : style.main) }>
					<Loading />
					<Helmet { ...config.app.head[i18n.language] } />
					<Header { ...this.props } />
					<div className={ style.body }>
						{ children }
					</div>
				</main>
			</IntlProvider>
		);
	}
}

const mapStateToProps = state => {
	return { i18n: state.i18n, menu: state.menu, page: state.pages.page }
};

export default asyncConnect([
	{
		deferred: true,
		promise: ({ store: { dispatch }, location }) => dispatch(
			loadMenu(2), loadSingle(location.pathname.replace(/^\/|\/$/g, '')
		))
	}
])(
	connect(
		mapStateToProps, null
	)(App)
);
