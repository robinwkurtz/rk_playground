import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navigation extends Component {
	render() {
		const { menu } = this.props;
		return (
			<div>
				<h3>Navigation</h3>
				{
					menu.loaded ?
						<ul>
							{
								menu.data.items.map(
								(item) => (
									<li key={ item.id }>
										<Link to={ `/${(item.object_slug === 'home') ? '' : item.object_slug}` }>
											{ item.title }
										</Link>
									</li>
								))
							}
						</ul>
					:
					null
				}
			</div>
		);
	}
}
