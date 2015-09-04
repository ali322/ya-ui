'use strict'
var React = require("react");

var Icon = React.createClass({
    render(){
        var props = this.props;
        var Component = props.href ? 'a' : 'i';
        return (
            <Component
            {...props}
            className={this.props.className}
            >{this.props.children}</Component>
        );
    }
})

export default Icon;