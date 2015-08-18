'use strict'
import React from 'react';
import Icon from "./icon.jsx";

class Selected extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedValue:props.val
        };
    }
    handleChange(optionValue){
        this.setState({
            selectedValue:optionValue
        });
    }
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
                <button>{selectedValue}<Icon className="fa fa-home fa-fw" /></button>
                <ul>
                    {options}
                </ul>
            </div>
        );
    }
}

export default Selected;