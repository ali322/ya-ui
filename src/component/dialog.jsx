let React = require("react/addons"),
    Reflux = require('reflux');

let dialogStore = require('../store/dialog.js');
let dialogAction = require('../action/dialog.js');

let Dialog = React.createClass({
    mixins:[Reflux.connect(dialogStore)],
    getInitialState(){
        return {
            active:false
        };
    },
    render(){
        var classes = React.addons.classSet({
            ['dialog-wrap']:true,
            ['active']:this.state.active
        });
        return (
            <div className={classes}>
            <div className="dialog">
            {this.state.title && <h3>{this.state.title}</h3>}
            <div className="dialog-content">{this.state.content}</div>
            <div className="dialog-btns">
            {this.state.cancelBtn && <button onClick={dialogAction.cancel}>{this.state.cancelBtn}</button>}
            {this.state.confirmBtn && <button onClick={dialogAction.confirm}>{this.state.confirmBtn}</button>}
            </div>
            </div>
            </div>
        );
    }
});

module.exports = Dialog;