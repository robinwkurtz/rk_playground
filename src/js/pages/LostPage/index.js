import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

import { loadSingle } from 'pages';

class LostPage extends Component {
	render() {
		const { page } = this.props;
		const p = this.props.page.lost;
		const content = { __html: p.content.rendered };
		return (
			<div className="row">
				<div
					className="column"
					dangerouslySetInnerHTML={content}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { menu: state.menu, page: state.pages.page }
};

export default asyncConnect([
	{
		deferred: true,
		promise: ({ store: { dispatch } }) => {
			return dispatch(loadSingle('lost'));
		}
	}
])(
	connect(
		mapStateToProps, null
	)(LostPage)
);
