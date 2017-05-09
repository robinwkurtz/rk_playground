import React, { Component } from 'react';

export default class GeneralPage extends Component {
	render() {
		const { page, location } = this.props;
		const path = location.pathname.replace(/^\/|\/$/g, '');
		const p = page[path];
		const title = p.title.rendered;
		const content = { __html: p.content.rendered };
		return (
			<div key={title} className="row">
				<div
					className="column"
					dangerouslySetInnerHTML={content}
				/>
			</div>
		);
	}
}
