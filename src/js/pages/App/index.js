import gstyles from 'gstyles';

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

class App extends Component {
	render() {
		const { children, menu, page } = this.props;
		return (
			<main className={style.html}>
				<div className={ classNames((menu.open) ? [style.body, style.isactive] : style.body) }>
					<div className={style.site}>
						<Loading />
						<Helmet { ...config.app.head } />
						<Header { ...this.props } />
						<div className={ classNames(style.main, 'content') }>
							{ React.cloneElement(children, { page }) }
						</div>
					</div>
				</div>
			</main>
		);
	}
}

const mapStateToProps = state => {
	return { menu: state.menu, page: state.pages.page }
};

export default asyncConnect([
	{
		deferred: true,
		promise: ({ store: { dispatch }, location }) => {
			const slug = location.pathname.replace(/^\/|\/$/g, '') || 'home';
			return dispatch(loadSingle(slug));
		}
	},
	{
		deferred: true,
		promise: ({ store: { dispatch } }) => {
			return dispatch(loadMenu(2));
		}
	}
])(
	connect(
		mapStateToProps, null
	)(App)
);
