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
		const { dispatch, menu, site } = this.props;
		const social = site.data.site_information_social[0];
		return (
			<div className="column float">
				<a
					href="#"
					onClick={ (e) => { this.clickToggleHeartMenu(e, dispatch) } }
					className={ classNames(style.heartmenubutton, (menu.heart) ? style.isactive : '' ) }
					title="Social"
				>
					<div className={ classNames(style.hearticon, 'css-bounce', 'icon-font', 'icon-heart') }></div>
				</a>
				<div className={ classNames(style.heartmenu, (menu.heart) ? style.isactive : '' ) }>
					<ul>
						{
							social.map(function(item, index) {
								const title = item.title;
								const icon = item.icon;
								const url = item.url;
								const target = (url.includes("http")) ? '_blank' : '_self';
								if (item && title) {
									return (
									   	<li
											key={ index }
											className={ icon }
										>
									   		<a href={ url } target={ target } title={ title }>
									   			<div className={ `icon-${icon}` } />
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
