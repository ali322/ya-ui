'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import moment from "moment";
import Datepicker from "./datepicker.jsx";
import Timepicker from "./timepicker.jsx";
import Icon from "../core/icon.jsx";

class DatetimePicker extends Component{
    constructor(props){
        super(props);
        var showTimepicker = this.props.showTimepicker;
        if(this.props.showDatepicker && this.props.showTimepicker){
            showTimepicker = false
        }

        const {date} = this.props;
        this.state = {
            selectedDate:date,
            showDatepicker:this.props.showDatepicker,
            showTimepicker:showTimepicker
        }
    }
    handleYearChange(year,e){
        const dateChanged = moment(this.state.selectedDate).year(year)
        if(dateChanged.year() > this.props.maxYear || dateChanged.year() < this.props.minYear){
            return;
        }
        this.setState({
            selectedDate:dateChanged.toDate()
        },()=>{
            this.props.onChange(dateChanged.toDate());
        });
    }
    handleMonthChange(month,e){
        const dateChanged = moment(this.state.selectedDate).month(month)
        if(dateChanged.year() > this.props.maxYear || dateChanged.year() < this.props.minYear){
            return;
        }
        this.setState({
            selectedDate:dateChanged.toDate()
        },()=>{
            this.props.onChange(dateChanged.toDate());
        });
    }
    handleDayChange(day,e){
        const dateChanged = moment(this.state.selectedDate).date(day)
        this.setState({
            selectedDate:dateChanged.toDate()
        },()=>{
            this.props.onChange(dateChanged.toDate());
        });
    }
    renderDatepicker(){
        const classes = classNames({
            invisible:this.state.showDatepicker !== true
        })
        return (
            <Datepicker 
            className={classes}
            date={this.state.selectedDate}
            onMonthChange={this.handleMonthChange.bind(this)}
            onYearChange={this.handleYearChange.bind(this)}
            onDayChange={this.handleDayChange.bind(this)}/>
        );
    }
    handleHourChange(hour,e){
        const dateChanged = moment(this.state.selectedDate).hour(hour)
        this.setState({
            selectedDate:dateChanged.toDate()
        },()=>{
            this.props.onChange(dateChanged.toDate());
        });
        // console.log('hour',hour)
    }
    handleMinuteChange(minute,e){
        const dateChanged = moment(this.state.selectedDate).minute(minute);
        this.setState({
            selectedDate:dateChanged.toDate()
        },()=>{
            this.props.onChange(dateChanged.toDate());
        });
        // console.log('minute',minute)
    }
    handleSecondChange(second,e){
        const dateChanged = moment(this.state.selectedDate).second(second);
        this.setState({
            selectedDate:dateChanged.toDate()
        },()=>{
            this.props.onChange(dateChanged.toDate());
        });
        // console.log('second',second)
    }
    renderTimepicker(){
        const classes = classNames({
            invisible:this.state.showTimepicker !== true
        })
        return (
            <Timepicker 
            ref="timepicker" 
            className={classes}
            date={this.state.selectedDate} 
            onSecondChange={this.handleSecondChange.bind(this)} 
            onMinuteChange={this.handleMinuteChange.bind(this)} 
            onHourChange={this.handleHourChange.bind(this)}/>
        );
    }
    handleToggleTimepicker(){
        this.setState({
            showDatepicker:!this.state.showDatepicker,
            showTimepicker:!this.state.showTimepicker
        });
    }
    renderToggle(){
        if(this.props.singleton === true){
            return null;
        }
        const {selectedDate} = this.state;
        const displayTime = moment(selectedDate).format("HH:mm:ss");
        const displayDate = moment(selectedDate).format("YYYY-MM-DD");
        if(this.state.showDatepicker){
            return (
            <div className="datetime-toggle">
            <span className="time-toggler" onClick={this.handleToggleTimepicker.bind(this)}><Icon icon="clock" />{displayTime}</span>
            </div>
            )
        }else if(this.state.showTimepicker){
            return (
            <div className="datetime-toggle">
            <span className="date-toggler" onClick={this.handleToggleTimepicker.bind(this)}><Icon icon="calendar" />{displayDate}</span>
            </div>
            )
        }
    }
    render(){
        return (
            <div className="datetime-picker">
            <div className="datetime-date">
            {this.renderDatepicker()}
            </div>
            <div className="datetime-time">
            {this.renderTimepicker()}
            </div>
            {this.renderToggle()}
            </div>
        )
    }
}

DatetimePicker.defaultProps = {
    date:new Date(),
    maxYear:2050,
    minYear:1970,
    singleton:false,
    showDatepicker:true,
    showTimepicker:true,
    onChange:function(){}
}

export default DatetimePicker;