import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import Form from 'form';

export default class ContactPage extends Component {
	render() {
		const { page, location } = this.props;
		const path = location.pathname.replace(/^\/|\/$/g, '');
		const p = page[path];
		const title = p.title.rendered;
		const content = { __html: p.content.rendered };
		return (
			<div key={title}>
				<div className="row">
					<div
						className="column"
						dangerouslySetInnerHTML={content}
					/>
				</div>
				<div className="row">
					<Form />
				</div>
			</div>
		);
	}
}
