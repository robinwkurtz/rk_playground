import gstyles from 'gstyles';

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import classNames from 'classnames';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import config from 'config';
import Loading from 'loading';
import Header from 'header';

import { load as loadMenu } from 'menu';
import { loadSingle } from 'pages';
import { load as loadSiteInfo } from 'site';

import favicon from '../../../images/icon/favicon.ico';

import style from './index.scss';

class App extends Component {
	render() {
		const { children, menu, page, location } = this.props;
		const hasPage = Object.keys(page).length;
		const slug = location.pathname.replace('/', '');
		return (
			<main className={style.html}>
				<div className={ classNames((menu.open) ? [style.body, style.isactive] : style.body) }>
					<div className={style.site}>
						<Loading />
						<Helmet
							titleTemplate={config.app.head.titleTemplate}
							defaultTitle={config.app.head.defaultTitle}
						>
							<html lang="en" />
							<meta charSet="utf-8" />
							{ /*
								<base target="_blank" href={baseUrl} />
							*/ }
							<meta property="og:type" content="page" />
							<link rel="icon" type="image/x-icon" href={favicon} />
						</Helmet>
						{(hasPage) ? <Header { ...this.props } /> : null}
						<div className={ classNames(style.main, 'content') }>
							<CSSTransitionGroup
								transitionName="fade"
								transitionEnterTimeout={500}
          						transitionLeaveTimeout={300}
							>
								{ (hasPage) ? React.cloneElement(children, { page, key: slug }) : children }
							</CSSTransitionGroup>
						</div>
					</div>
				</div>
			</main>
		);
	}
}

const mapStateToProps = state => {
	return {
		menu: state.menu,
		page: state.pages.page,
		site: state.site
	}
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
	},
	{
		deferred: true,
		promise: ({ store: { dispatch } }) => {
			return dispatch(loadSiteInfo());
		}
	}
])(
	connect(
		mapStateToProps, null
	)(App)
);
