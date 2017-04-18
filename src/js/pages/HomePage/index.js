import React, { Component } from 'react';

export default class HomePage extends Component {
	render() {
		const p = this.props.page.home;
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
