import React, { Component } from 'react';

export default class CVPage extends Component {
	render() {
		const { page, location } = this.props;
		const path = location.pathname.replace(/^\/|\/$/g, '');
		const p = page[path];
		const title = p.title.rendered;
		{ /* Ouch... */ }
		const contentArray = p.content.rendered.split('[split]');
		const content1 = { __html: contentArray[0].replace('</p>', '') };
		const content2 = { __html: contentArray[1].replace('</p>', '') };
		const content3 = { __html: contentArray[2].replace('</p>', '') };
		return (
			<div key={title}>
				<div className="row">
					<div
						className="column small-12 medium-6 content"
						dangerouslySetInnerHTML={content1}
					/>
					<div
						className="column small-12 medium-6 content"
						dangerouslySetInnerHTML={content2}
					/>
				</div>
				<div className="row">
					<div
						className="column small-12 content"
						dangerouslySetInnerHTML={content3}
					/>
				</div>
			</div>
		);
	}
}
