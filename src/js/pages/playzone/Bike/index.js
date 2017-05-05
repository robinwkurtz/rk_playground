import React from 'react';
import style from './index.scss';

const Intro = React.createClass({
    render: function () {
        return (
            <div className="wrapper">
                <div className="row padding-top padding-bottom double-space">
                    <div className="column align-center">
                        <h1>Welcome to my react playground... What will I come up with!</h1>
                    </div>
                </div>
            </div>
		);
	}
});

const Seat = React.createClass({
    render: function () {
        const styles = {
            top: (this.props.top),
            right: (this.props.right),
            bottom: (this.props.bottom),
            left: (this.props.left)
        }
        const classes = this.props.classes
        return (
            <div className={"part part--absolute " + classes} style={styles}>
                <div className="seat part part--absolute" />
                <div className="seat-bottom part part--absolute" />
            </div>
        );
    }
});

const Handlebar = React.createClass({
    render: function () {
        const styles = {
            top: (this.props.top),
            right: (this.props.right),
            bottom: (this.props.bottom),
            left: (this.props.left)
        }
        const classes = this.props.classes
        return (
            <div className={"part part--absolute " + classes} style={styles}>
                <div className="handlebar part part--absolute" />
                <div className="handlebar handlebar--end part part--absolute" />
            </div>
        );
    }
});

const Stem = React.createClass({
    render: function () {
        const styles = {
            top: (this.props.top),
            right: (this.props.right),
            bottom: (this.props.bottom),
            left: (this.props.left)
        }
        const classes = this.props.classes
        return (
            <div className={"stem part part--absolute " + classes} style={styles} />
        );
    }
});

const TubeTop = React.createClass({
    render: function () {
        const styles = {
            top: (this.props.top),
            right: (this.props.right),
            bottom: (this.props.bottom),
            left: (this.props.left)
        }
        const classes = this.props.classes
        return (
            <div className={"tube-top part part--absolute " + classes} style={styles} />
        );
    }
});

const TubeSeat = React.createClass({
    render: function () {
        const styles = {
            top: (this.props.top),
            right: (this.props.right),
            bottom: (this.props.bottom),
            left: (this.props.left)
        }
        const classes = this.props.classes
        return (
            <div className={"tube-seat part part--absolute " + classes} style={styles} />
        );
    }
});

const TubeDown = React.createClass({
    render: function () {
        const styles = {
            top: (this.props.top),
            right: (this.props.right),
            bottom: (this.props.bottom),
            left: (this.props.left)
        }
        const classes = this.props.classes
        return (
            <div className={"tube-down part part--absolute " + classes} style={styles} />
        );
    }
});

const StaysSeat = React.createClass({
    render: function () {
        const styles = {
            top: (this.props.top),
            right: (this.props.right),
            bottom: (this.props.bottom),
            left: (this.props.left)
        }
        const classes = this.props.classes
        return (
            <div className={"stays-seat part part--absolute " + classes} style={styles} />
        );
    }
});

const Wheel = React.createClass({
    render: function () {
        const styles = {
            top: (this.props.top),
            right: (this.props.right),
            bottom: (this.props.bottom),
            left: (this.props.left)
        }
        const classes = this.props.classes
        return (
            <div className={"wheel part part--absolute " + classes} style={styles} />
        );
    }
});

const Sprocket = React.createClass({
    render: function () {
        const styles = {
            top: (this.props.top),
            right: (this.props.right),
            bottom: (this.props.bottom),
            left: (this.props.left)
        }
        const classes = this.props.classes
        return (
            <div className={"sprocket part part--absolute " + classes} style={styles} />
        );
    }
});

const Chain = React.createClass({
    render: function () {
        const styles = {
            top: (this.props.top),
            right: (this.props.right),
            bottom: (this.props.bottom),
            left: (this.props.left),
            width: (this.props.width)
        }
        const classes = this.props.classes
        return (
            <div className={"chain part part--absolute " + classes} style={styles} />
        );
    }
});

const Ground = React.createClass({
    render: function () {
        const styles = {
            top: (this.props.top),
            right: (this.props.right),
            bottom: (this.props.bottom),
            left: (this.props.left),
            width: (this.props.width)
        }
        const classes = this.props.classes
        return (
            <div className={"ground part part--absolute " + classes} style={styles} />
        );
    }
});

const Backround = React.createClass({
    render: function () {
        const classes = this.props.classes
        return (
            <div className="background part part--absolute css-scroll">
                <div className="element element--x element--1" />
                <div className="element element--x element--2 border-pink" />
                <div className="element element--x element--3 border-blue" />
                <div className="element element--line element--4" />
                <div className="element element--line element--5" />
                <div className="element element--line element--6" />
            </div>
        );
    }
});

export const Bike = React.createClass({
    render: function () {
        return (
            <div className="wrapper">
                <div className="row small-padding-top small-padding-bottom double-space">
                    <div className="column align-center">
                         <div className="bike part part--container">
                            <TubeTop top="71px" right="268px" />
                            <Seat top="24px" left="260px" />
                            <TubeSeat top="159px" right="292px" />
                            <TubeDown top="187px" right="222px" />
                            <StaysSeat top="160px" right="406px" />
                            <Handlebar top="20px" right="296px" />
                            <Stem top="135px" right="106px" />
                            <Wheel bottom="0" left="108px" classes="wheel--back wheel--inner-quarter css-rotate" />
                            <Ground bottom="4px" left="120px" classes="ground--back" />
                            <Chain left="248px" bottom="127px" classes="chain--top" />
                            <Sprocket left="348px" bottom="56px" />
                            <Chain left="233px" bottom="76px" width="128px" rotate="16deg" classes="chain--bottom" />
                            <Wheel bottom="0" right="72px" classes="wheel--front wheel--inner-half css-rotate" />
                            <Ground bottom="4px" right="130px" classes="ground--front" />
                            <Backround />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
