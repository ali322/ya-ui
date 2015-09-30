'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Dropdown from "../dropdown/dropdown.jsx";
import Icon from "../core/icon.jsx";
import Slider from "../slider/slider.jsx";
import Slide from "../slider/slide.jsx";
import Timepicker from "../datetimepicker/timepicker.jsx";

class SelectedSlide extends Component{
    constructor(props){
        super(props);
        this.state = {
            value:this.props.value,
        }
    }
    getValueArray(){
        return this.state.value ? this.state.value.split(this.props.delimiter):[];
    }
    getActiveIndexArray(){
        return this.state.activeIndex ? this.state.activeIndex.split(this.props.delimiter):[];
    }
    getValue(){
        return this.state.value;
    }
    hasValue(value){
        return this.getValueArray().indexOf(value) > -1;
    }
    setValue(value,activeIndex){
        this.setState({
            value,
            activeIndex
        },()=>{
            this.props.onChange(value);
        })
    }
    handleCheck(activeIndex,e){
        e && e.preventDefault();
        var checkedOption;
        this.props.options.forEach((option,i)=>{
            if(activeIndex === i){
                checkedOption = option;
            }
        })
        var selectedValue = checkedOption.value;

        if(this.props.multiple){
            var values = this.getValueArray();
            var activeIndexes = this.getActiveIndexArray();
            if(this.hasValue(selectedValue)){
                values.splice(values.indexOf(selectedValue),1);
                activeIndexes.splice(activeIndex,1)
            }else{
                values.push(selectedValue);
                activeIndexes.push(activeIndex);
            }
            this.setValue(values.join(this.props.delimiter),activeIndexes.join(this.props.delimiter));
        }else{
            this.setValue(selectedValue,activeIndex);
            // this.refs.dropdown.setDropdownState(false);
        }
    }
    renderStatus(labels){
        return labels.map((label)=>{
            return (
                <div className="selected-label">{label}</div>
            );
        })
    }
    renderItem(){
        var selectedLabels = [];
        var activeIndexes = [];
        var items = [];
        var groupHeader;
        const {selectedIcon,unselectedIcon} = this.props;
        this.props.options.forEach((option,i)=>{
            const checked = this.hasValue(option.value);
            const checkedClass = checked?"checked":null;
            const checkedIcon = checked?<Icon icon={selectedIcon}/>:
            unselectedIcon === null?null:<Icon icon={unselectedIcon}/>;
            checked && selectedLabels.push(option.label);
            checked && activeIndexes.push(i);
            items.push(
                <Slide className={checkedClass} 
                key={"item-"+i} >
                <span className="selected-item">{option.label}</span>
                {checkedIcon}
                </Slide>
            );
        });


        return {selectedLabels,activeIndexes,items};
    }
    redrawSlider(){
        const slider = this.refs.dropdownSlide;
        slider.initialize();
    }
    render(){
        const classes = classNames(this.props.className,"selected","selected-slide");
        
        const {items,selectedLabels,activeIndexes} = this.renderItem();

        const status = (
            <span className="status">{selectedLabels.length > 0?
            (selectedLabels.length > 1?this.renderStatus(selectedLabels):
            selectedLabels.join(",")):(
                <span className="placeholder">{this.props.placeholder}</span>
            )
            }</span>
        )

        const itemsStyle = {
            maxHeight:this.props.maxHeight
        }
        // console.log('activeIndexes',activeIndexes[0])
        return (
            <Dropdown className={classes} title={status} 
            onOpen={this.redrawSlider.bind(this)}
            ref="dropdown" {...this.props}>
            <Slider 
            controlNav={false} 
            autoPlay={false}
            loop={false}
            onChange={this.handleCheck.bind(this)}
            slideTransitionCount={5}
            defaultActiveIndex={activeIndexes[0]}
            oriention="vertical" ref="dropdownSlide">{items}</Slider>
            <input type="hidden" value={this.state.value}/>
            </Dropdown>
        )
    }
}

SelectedSlide.defaultProps = {
    delimiter:",",
    placeholder:"点击请选择...",
    selectedIcon:"ok",
    unselectedIcon:null,
    maxHeight:null,
    minWidth:null,
    infinity:false,
    multiple:false,
    onChange:function(){}
};


export default SelectedSlide;