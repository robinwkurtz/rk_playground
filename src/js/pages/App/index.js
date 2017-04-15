import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import classNames from 'classnames';

import config from 'config';
import Loading from 'loading';
import Header from 'header';

import { load as loadMenu } from 'menu';
import { loadSingle } from 'pages';

import style from './index.scss';
import gstyles from 'gstyles';

class App extends Component {
	render() {
		const { children, menu, page } = this.props;
		console.log('App', this.props);
		return (
			<IntlProvider locale={ i18n.language } messages={ i18n.messages }>
				<main className={ classNames((menu.open) ? [style.main, style.isactive] : style.main) }>
					<Loading />
					<Helmet { ...config.app.head } />
					<Header { ...this.props } />
					<div className={ style.body }>
						{ React.cloneElement(children, { page }) }
					</div>
				</main>
			</IntlProvider>
		);
	}
}

const mapStateToProps = state => {
	return { menu: state.menu, page: state.pages.page }
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
