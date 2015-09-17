'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import moment from "moment";
import DatetimePicker from "./datetimepicker.jsx"; 
import Dropdown from "../dropdown/dropdown.jsx";
import Icon from "../core/icon.jsx";

class DatetimeInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            value:this.props.value
        }
    }
    getValue(){
        return this.state.value;
    }
    setValue(value){
        this.setState({
            value
        },()=>{
            this.props.onChange(value);
        })
    }
    renderStatus(){
        const selectedDate = this.state.value;
        var selectedDateLabel;
        var showTimepicker = this.props.showTimepicker;
        if(this.props.showDatepicker && this.props.showTimepicker){
            showTimepicker = false
        }
        if(!showTimepicker){
            selectedDateLabel = moment(selectedDate).format("YYYY-MM-DD");
        }else if(showTimepicker){
            selectedDateLabel = moment(selectedDate).format("HH:mm:ss");
        }else{
            selectedDateLabel = moment(selectedDate).format("YYYY-MM-DD HH:mm:ss");
        }
        return (
            <span className="status">{selectedDate!== undefined ?
            (<div className="selected-datetime">{selectedDateLabel}</div>):
            (<span className="placeholder">{this.props.placeholder}</span>)
            }</span>
        )
    }
    redrawDatetimePicker(){
        if(this.props.showTimepicker === true){
            // console.log(this.refs.datetimepicker)
            const hourpicker = this.refs.datetimepicker.refs.timepicker.refs.hourpicker;
            const minutepicker = this.refs.datetimepicker.refs.timepicker.refs.minutepicker;
            const secondpicker = this.refs.datetimepicker.refs.timepicker.refs.secondpicker;
            hourpicker.initialize();
            secondpicker.initialize();
            minutepicker.initialize();
        }
    }
    render(){
        return (
            <Dropdown className="datetime-input"
            title={this.renderStatus()} 
            onOpen={this.redrawDatetimePicker.bind(this)}
            ref="dropdown">
            <DatetimePicker {...this.props} value={this.state.value} 
            onChange={this.setValue.bind(this)} 
            ref="datetimepicker"/>
            <input type="hidden" value={this.state.value}/>
            </Dropdown>
        )
    }
}

DatetimeInput.defaultProps = {
    placeholder:"点击请选择...",
    maxHeight:null,
    minWidth:null,
    singleton:false,
    showDatepicker:true,
    showTimepicker:true,
    onChange:function(){}
}

export default DatetimeInput;