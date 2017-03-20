import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { bindActionCreators } from 'redux';
import ui from 'redux-ui';
import classNames from 'classnames';

import Navigation from 'navigation';
import Social from 'social';

import { toggleMenu } from 'menu';

import style from './index.scss';

export class Header extends Component {
	constructor(props) {
		super(props);
		this.clickToggleMenu = this.clickToggleMenu.bind(this);
	}
	clickToggleMenu(dispatch) {
		return (
			 dispatch(toggleMenu())
		)
	}
	render() {
		return (
			<header className={ style.header }>
	            <div className="row full flush">
	                <div className="column float">
	                    <Link className={ style.logo } to="/">
	                        <div className="show-for-medium-up">
	                            Robin Kurtz
	                        </div>
	                        <div className="show-for-small-only">
	                            RK
	                        </div>
	                    </Link>
	                </div>
	                <div className="column float">
	                    <a href="#" onClick={ () => { this.clickToggleMenu(this.props.dispatch) } } className={ classNames(style.menubutton, (this.props.menu.open) ? style.isactive : '' ) }>
	                        <div className={ style.burger }>
	                            <div className={ style.burgericon }>Menu</div>
	                        </div>
	                    </a>
	                </div>
					<Social { ...this.props } />
	            </div>
	            <div className={ classNames(style.menu, (this.props.menu.open) ? style.isactive : '' ) }>
					<Navigation { ...this.props } />
	                <div className={ style.copyright }>
	                    Copyright
	                </div>
	            </div>
        	</header>
		)
	}
}

export default asyncConnect([
	{
		promise: ({ store: { dispatch } }) => dispatch(),
		deferred: true
	}
])(connect()(Header));
