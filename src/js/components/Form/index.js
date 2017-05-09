import React from 'react';
import { LocalForm, Control, Errors } from 'react-redux-form';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import style from './index.scss';

const isRequired = (val) => val && val.length > 0;
const isValidEmail = function(email) {
    let validEmail = true;
    if (typeof email !== 'undefined') {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const validEmail = re.test(email);
    }
    return validEmail;
}

const requestBuildQueryString = function(params) {
    var queryString = [];
    for(var property in params)
        if (params.hasOwnProperty(property)) {
            queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]));
        }
    return queryString.join('&');
}

export default class MyApp extends React.Component {
    handleSubmit(values) {
        event.preventDefault();
        this.setState({ type: 'sending', message: 'Sending...' }, this.sendFormData(values));
    }
    sendFormData(values) {
        var formData = values;

        var formData = {
            fname: values.fname,
            lname: values.lname,
            email: values.email,
            phone: values.phone,
            message: values.message,
            required: [
                'fname', 'lname', 'email', 'phone', 'message'
            ] // List required fields for server-side validation
        };

        // Send the form data.
        var xmlhttp = new XMLHttpRequest();
        var _this = this;
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4) {
                var response = JSON.parse(xmlhttp.responseText);
                if (xmlhttp.status === 200 && response.status === 'OK') {
                    _this.setState(
                        {
                            type: 'success',
                            message: 'Hot Dog! We have received your message and will get in touch shortly. Thanks!'
                        }
                    );
                } else {
                    _this.setState(
                        {
                            type: 'danger',
                            message: 'Herp Derp! Something went wrong, would you mind trying again? Or reach out to me via social!'
                        }
                    );
                }
            }
        };
        xmlhttp.open('POST', 'send', true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(requestBuildQueryString(formData));
    }
    render() {
        if (this.state && this.state.type === 'sending' && this.state.message) {
            return (
                <div
                    key={ this.state.type }
                    className={style.alert}
                >
                    <h4>{ this.state.message }</h4>
                    <br />
                    <span className="loading" />
                </div>
            );
        } else if (this.state && (this.state.type === 'success' || this.state.type === 'danger') && this.state.message) {
            return (
                <div
                    key={ this.state.type }
                    className={style.alert}
                >
                    <h4>{ this.state.message }</h4>
                </div>
            );
        } else {
            return (
                <LocalForm
                    key="form"
                    onSubmit={(values) => this.handleSubmit(values)}
                    className={style.form}
                >
                    <div className={style.wrapper}>
                        <div className="column small-12 medium-6">
                            <Control.text
                                key="fname.input"
                                model=".fname"
                                placeholder="First name"
                                validators={{ isRequired }}
                            />
                            <Errors
                                key="fname.error"
                                wrapper={(props) => <div className={style.error}>{props.children}</div>}
                                show={{ touched: true, focus: false }}
                                model=".fname"
                                messages={{
                                    isRequired: 'Hmm... You must have a first name!?',
                                }}
                            />
                        </div>
                        <div className="column small-12 medium-6">
                            <Control.text
                                model=".lname"
                                placeholder="Last name"
                                validators={{ isRequired }}
                            />
                            <Errors
                                wrapper={(props) => <div className={style.error}>{props.children}</div>}
                                show={{ touched: true, focus: false }}
                                model=".lname"
                                messages={{
                                    isRequired: 'I don\'t trust those with no last name...',
                                }}
                            />
                        </div>
                    </div>
                    <div className={style.wrapper}>
                        <div className="column small-12 medium-6">
                            <Control.text
                                type="email"
                                model=".email"
                                placeholder="Email Address"
                                validators={{ isRequired, isValidEmail }}
                            />
                            <Errors
                                wrapper={(props) => <div className={style.error}>{props.children}</div>}
                                show={{ touched: true, focus: false }}
                                model=".email"
                                messages={{
                                    isRequired: 'I don\'t think leaving this one blank is wise.',
                                    isValidEmail: 'Oh... This looks wrong, please have a look!'
                                }}
                            />
                        </div>
                        <div className="column small-12 medium-6">
                            <Control.text
                                model=".phone"
                                placeholder="Telephone"
                                validators={{ isRequired }}
                            />
                            <Errors
                                wrapper={(props) => <div className={style.error}>{props.children}</div>}
                                show={{ touched: true, focus: false }}
                                model=".phone"
                                messages={{
                                    isRequired: 'Just in case that email bounces.',
                                }}
                            />
                        </div>
                    </div>
                    <div className={style.wrapper}>
                        <div className="column small-12">
                            <Control.textarea
                                model=".message"
                                placeholder="Message"
                                validators={{ isRequired }}
                            />
                            <Errors
                                wrapper={(props) => <div className={style.error}>{props.children}</div>}
                                show={{ touched: true, focus: false }}
                                model=".message"
                                messages={{
                                    isRequired: 'All this work and you have nothing to say?',
                                }}
                            />
                        </div>
                    </div>
                    <div className={style.wrapper}>
                        <div className="column small-12">
                            <button
                                className="btn"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </LocalForm>
            );
        }

    }
}
