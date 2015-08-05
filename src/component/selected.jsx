'use strict'
import React from 'react';

let Selected = React.createClass({
    getInitialState(){
        return {
            selectedValue:this.props.val
        };
    },
    handleChange(optionValue){
        this.setState({
            selectedValue:optionValue
        });
    },
    render(){
        var options = "";
        if(this.props.options.length > 0){
            var options = this.props.options.map(function(option,i){
                return (
                    <li key={`option-${i}`} onClick={this.handleChange.bind(this,option.value)}>{option.text}</li>
                );
            }.bind(this));
        }
        var selectedValue = this.state.selectedValue ? this.state.selectedValue : "点击选择..";
        return (
            <div className="yaui-selected">
                <input type="hidden" valueLink={this.state.selectedValue}/>
                <button>{selectedValue}<i className="fa fa-home fa-fw"></i></button>
                <ul>
                    {options}
                </ul>
            </div>
        );
    }
});

export default Selected;