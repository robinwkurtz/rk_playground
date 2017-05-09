import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navigation extends Component {
	render() {
		const { menu, location } = this.props;
		const currentPath = location.pathname.replace('/', '');
		return (
			<div>
				{
					menu.loaded ?
						<ul>
							{
								menu.data.items.map(
								(item) => (
									<li key={ item.id }>
										{
											(currentPath === item.object_slug) ? (
												<span className="active">
													{ item.title }
												</span>
											) : (
												<Link to={ `/${(item.object_slug === 'home') ? '' : item.object_slug}` }>
													{ item.title }
												</Link>
											)
										}
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
