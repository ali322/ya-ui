'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import moment from "moment";
import Slider from "../slider/slider.jsx";
import Slide from "../slider/slide.jsx";

class TimePicker extends Component{
    renderHour(){
        const {date,onHourChange} = this.props;
        var hour = moment(date).hour();
        hour += 1;
        var hours = [];
        for(var i = 0;i<24;i++){
            const key = "hour-" + i;
            hours.push(
                <Slide>
                <span>{i}</span>
                </Slide>
            );
        }
        return (
            <div className="time-picker-hour">
            <Slider 
            controlNav={false} 
            autoPlay={false}
            defaultActiveIndex={hour}
            onChange={onHourChange}
            oriention="vertical" ref="hourpicker">{hours}</Slider>
            </div>
        );
    }
    renderMinute(){
        const {date,onMinuteChange} = this.props;
        var minute = moment(date).minute();
        minute += 1;
        var minutes = [];
        for(var i = 0;i<60;i++){
            const key = "minute-" + i;
            minutes.push(
                <Slide>
                <span>{i}</span>
                </Slide>
            );
        }
        return (
            <div className="time-picker-minute">
            <Slider 
            controlNav={false} 
            autoPlay={false} 
            defaultActiveIndex={minute}
            onChange={onMinuteChange}
            oriention="vertical" ref="minutepicker">{minutes}</Slider>
            </div>
        );
    }
    shouldComponentUpdate(nextProps,nextState){
        return true;
    }
    renderSecond(){
        const {date,onSecondChange} = this.props;
        var second = moment(date).second();
        second += 1;
        var seconds = [];
        for(var i = 0;i<60;i++){
            const key = "second-" + i;
            seconds.push(
                <Slide>
                <span>{i}</span>
                </Slide>
            );
        }
        return (
            <div className="time-picker-second">
            <Slider 
            controlNav={false} 
            autoPlay={false} 
            defaultActiveIndex={second}
            onChange={onSecondChange}
            oriention="vertical" ref="secondpicker">{seconds}</Slider>
            </div>
        );
    }
    render(){
        // console.log('render TimePicker')
        const classes = classNames(this.props.className,"time-picker");
        return (
            <div className={classes}>
            {this.renderHour()}
            <div className="time-picker-divider">:</div>
            {this.renderMinute()}
            <div className="time-picker-divider">:</div>
            {this.renderSecond()}
            </div>
        )
    }
}

TimePicker.defaultProps = {
    date:new Date(),
    onHourChange:function(){},
    onMinuteChange:function(){},
    onSecondChange:function(){}
}

export default TimePicker;