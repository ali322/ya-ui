let React = require("react/addons"),
    Reflux = require('reflux');

let loadingStore = require('../store/loading.js');
let loadingAction = require('../action/loading.js');

let Loading = React.createClass({
    mixins:[Reflux.connect(loadingStore)],
    getInitialState(){
        return {
            active:false
        };
    },
    render(){
        var classes = React.addons.classSet({
            ['loading-wrap']:true,
            ['active']:this.state.active
        });
        return (
            <div className={classes}>
                <div className="loading-content"><span className="icon iconfont icon-loading"></span><div className="loading-hint">{this.state.hint}</div></div>
            </div>
        );
    }
});

module.exports = Loading;