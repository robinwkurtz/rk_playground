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

import style from './index.scss';
import gstyles from 'gstyles';


/*
This component wraps the app in a react-intl provider
It also reacts to changes in the current language and reconfigures the IntlProvider appropriately
Finally, it displays the Loading bar, the base Helmet config for <head> and the router children
*/
class App extends Component {
	static propTypes = {
		menus: React.PropTypes.object,
		i18n: React.PropTypes.object
	};
	render() {
		const { i18n, children, menu } = this.props;
		return (
			<IntlProvider locale={ i18n.language } messages={ i18n.messages }>
				<main className={ classNames((menu.open) ? style.isactive : '') }>
					<Loading />
					<Helmet { ...config.app.head[i18n.language] } />
					<Header { ...this.props } />
					{ children }
				</main>
			</IntlProvider>
		);
	}
}

const mapStateToProps = state => {
	return { i18n: state.i18n, menu: state.menu }
};

export default asyncConnect([
	{
		promise: ({ store: { dispatch } }) => dispatch(loadMenu(2)),
		deferred: true
	}
])(
	connect(
		mapStateToProps, null
	)(App)
);
