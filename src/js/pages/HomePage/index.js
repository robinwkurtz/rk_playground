import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';

import { loadSingle } from 'pages';

export default class HomePage extends Component {
	render() {
		const { page, location } = this.props;
		console.log('HomePage', this.props);
		// const path = location.pathname.replace(/^\/|\/$/g, '');
		// const p = page[(path) ? path : 'home'];
		// const title = p.title.rendered;
		// const content = { __html: p.content.rendered };
		return (
			<div>
				Home
			</div>
		);
	}
}
