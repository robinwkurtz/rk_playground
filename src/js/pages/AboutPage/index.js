import React, { Component } from 'react';

import style from './index.scss';

export default class AboutPage extends Component {
	render() {
		const { page, location } = this.props;
		const path = location.pathname.replace(/^\/|\/$/g, '');
		const p = page[path];
		const title = p.title.rendered;
		const content = { __html: p.content.rendered };
		return (
			<div key={title} className="row">
				<div className="column small-12 medium-4">
					<div className={style.bioimage}>
						<div>
							<div className="square" />
						</div>
					</div>
					<br />
					{ /* TO-DO: Make cooler, make it react more! */ }
					<div className="css-bounce align-center show-for-medium-up">
						<h4>
							click & hold me ;)
						</h4>
					</div>
				</div>
				<div className="column small-12 show-for-small-only" />
				<div
					className="column small-12 medium-7 large-6 large-offset-1 content"
					dangerouslySetInnerHTML={content}
				/>
			</div>
		);
	}
}
