import React, { Component } from 'react';
import { Link } from 'react-router';
import { socialList } from 'config';
import classNames from 'classnames';

import style from './index.scss';

export default class Social extends Component {
	render() {
		return (
			<div className="column float">
				<div className={ classNames(style.heartmenubutton, 'float-right') }>
					<div className={ classNames(style.hearticon, 'css-bounce') }></div>
				</div>
				<div className={ style.heartmenu }>
					<ul>
						{
							socialList.map((item, index) => (
								<li key={ index }>
									<a href={ item.link } target={ item.target } title={ item.title }>
										{ item.title }
									</a>
								</li>
							))
						}
					</ul>
				</div>
			</div>
		);
	}
}
