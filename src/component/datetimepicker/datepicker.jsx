'use strict';

import React,{Component} from "react";
import moment from "moment";
import classNames from "classnames";
import Icon from "../core/icon.jsx";

class DatePicker extends Component{
    renderMonthAndYear(){
        const selectedDate = moment(this.props.date);
        const month = selectedDate.month() + 1;
        const year = selectedDate.year();
        return (
            <div className="current-month-year">
            <a className="month-year-toggle" href="javascript:void(null)"><b>{year}</b>年<b>{month}</b>月</a>
            </div>
        )
    }
    renderWeeks(){
        const weeks = [
            "日","一","二","三","四","五","六"
        ]
        var weekLabels = [];
        for(var week of weeks){
            weekLabels.push(
                <div className="week-cell">{week}</div>
            )
        }
        return weekLabels;
    }
    renderDays(){
        const weekStart = this.props.weekStart;
        const weekEnd = ((weekStart + 6) % 7);
        const viewDate = moment(this.props.date);
        const selectedDay = viewDate.date();
        const currentMonth = viewDate.get('month');
        const daysOfMonth = viewDate.daysInMonth();

        var startOfMonth = moment(viewDate.toDate());
        startOfMonth.startOf('month');
        const offsetOfMonth = startOfMonth.date();
        
        var cells = [];

        for(var i = 1;i<=offsetOfMonth;i++){
            cells.push(
                <div className="blank-day day-cell">blank</div>
            );
        }

        for(var i = 1;i<=daysOfMonth;i++){
            const dayCellClasses = classNames({
                "valid-day":true,
                "day-cell":true,
                "selected":(i === selectedDay)
            });
            // console.log('selectedDay',selectedDay)
            cells.push(
                <div className={dayCellClasses} onClick={this.props.onDayChange.bind(this,i)}>{i}</div>
            )
        }
        return cells;
    }
    handleNextMonth(e){
        e && e.preventDefault();
        const {onMonthChange} = this.props;
        const selectedDate = moment(this.props.date);
        var month = selectedDate.month() + 1
        onMonthChange(month)
    }
    handlePrevMonth(e){
        e && e.preventDefault();
        const {onMonthChange} = this.props;
        const selectedDate = moment(this.props.date);
        var month = selectedDate.month() - 1
        onMonthChange(month)
    }
    handleNextYear(e){
        e && e.preventDefault();
        const {onYearChange} = this.props;
        const selectedDate = moment(this.props.date);
        var year = selectedDate.year() + 1
        onYearChange(year)
    }
    handlePrevYear(e){
        e && e.preventDefault();
        const {onYearChange} = this.props;
        const selectedDate = moment(this.props.date);
        var year = selectedDate.year() - 1
        onYearChange(year)
    }
    render(){
        const classes = classNames(this.props.className,"date-picker")
        return (
            <div className={classes}>
            <div className="date-picker-year-month">
            <div className="prev-year" onClick={this.handlePrevYear.bind(this)}><Icon icon="angle-double-left"/></div>
            <div className="prev-month" onClick={this.handlePrevMonth.bind(this)}><Icon icon="angle-left"/></div>
            {this.renderMonthAndYear()}
            <div className="next-month" onClick={this.handleNextMonth.bind(this)}><Icon icon="angle-right"/></div>
            <div className="next-year" onClick={this.handleNextYear.bind(this)}><Icon icon="angle-double-right"/></div>
            </div>
            <div className="date-picker-week">
            {this.renderWeeks()}
            </div>
            <div className="date-picker-day">
            {this.renderDays()}
            </div>
            </div>
        )
    }
}

DatePicker.defaultProps = {
    date:new Date(),
    weekStart:0,
    onDayChange:function(){},
    onMonthChange:function(){},
    onYearChange:function(){}
}

export default DatePicker;