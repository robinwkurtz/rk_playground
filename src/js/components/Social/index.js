import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { bindActionCreators } from 'redux';
import { socialList } from 'config';

import classNames from 'classnames';

import { toggleHeartMenu } from 'menu';

import style from './index.scss';

export default class Social extends Component {
	constructor(props) {
		super(props);
		this.clickToggleHeartMenu = this.clickToggleHeartMenu.bind(this);
	}
	clickToggleHeartMenu(e, dispatch) {
		e.preventDefault();
		return (
			 dispatch(toggleHeartMenu())
		)
	}
	render() {
		const { dispatch, menu } = this.props;
		return (
			<div className="column float">
				<a
					href="#"
					onClick={ (e) => { this.clickToggleHeartMenu(e, dispatch) } }
					className={ classNames(style.heartmenubutton, (menu.heart) ? style.isactive : '' ) }
				>
					<div className={ classNames(style.hearticon, 'css-bounce', 'icon-font', 'icon-heart') }></div>
				</a>
				<div className={ classNames(style.heartmenu, (menu.heart) ? style.isactive : '' ) }>
					<ul>
						{
							socialList.map(function(item) {
								if (item && item.title) {
									const slug = (item.icon) ? item.icon : item.title.toLowerCase();
									return (
									   	<li
											key={ item.title }
											className={ slug }
										>
									   		<a href={ item.link } target={ item.target } title={ item.title }>
									   			<div className={ `icon-${slug}` } />
									   		</a>
									   	</li>
								   )
								}
							})
						}
					</ul>
				</div>
			</div>
		);
	}
}
