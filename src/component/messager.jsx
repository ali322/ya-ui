let React = require("react/addons"),
    Reflux = require('reflux');

let messageStore = require('../store/messager.js');
let messagerAction = require('../action/messager.js');

let Messager = React.createClass({
    mixins:[Reflux.connect(messageStore,'messages')],
    render(){
        if(this.state.messages.length === 0 ){
            return null;
        }
        var items = this.state.messages.map(function(item,i){
            return (
                <MessagerItem key={i} {...item}/>
            );
        });
        var classes = React.addons.classSet({
            ['messager-wrap']:true,
            ['has-message']:this.state.messages.length > 0
        });
        return (
            <div className={classes}>
            {items}
            </div>
        );
    }
});

let MessagerItem = React.createClass({
    componentDidMount(){
        console.log(this.props.delay);
        setTimeout(function(){
            console.log('remove message');
            messagerAction.remove(this.props.key);
        }.bind(this),this.props.delay);
    },
    render(){
        var classes = React.addons.classSet({
            messager:true,
            ['success-messager']:this.props.level == 'success',
            ['error-messager']:this.props.level == 'error',
            ['info-messager']:this.props.level == 'info'
        });
        var btnStyle = {
            display:'none'
        };
        return (
            <div className={classes}>
            <button className="close-messager"  style={btnStyle} onClick={this.closeMessager}><span className="icon iconfont icon-close"></span></button>
            {this.props.title && <h3>{this.props.title}</h3>}
            <div className="messager-content">{this.props.content}</div>
            </div>
        );
    }
});

module.exports = Messager;