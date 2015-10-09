'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import rAF from "../../lib/requestAnimationFrame";

export class Accordion extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:props.activeIndex !== undefined?props.activeIndex:0,
            prevIndex:null,
            itemHeight:null
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.activeIndex !== undefined && 
            nextProps.activeIndex !== this.props.activeIndex){
            this.setState({
                prevIndex:this.prop.activeIndex,
                activeIndex:nextProps.activeIndex
            })
        }
    }
    componentDidMount(){
        const activeItemNode = React.findDOMNode(this.refs.activeItem);
        this.setState({
            itemHeight:activeItemNode.offsetHeight
        })
    }
    handleSelect(index,e){
        e && e.preventDefault();
        const prevIndex = this.state.activeIndex;
        this.setState({
            activeIndex:index,
            prevIndex
        },()=>{
            this.props.onSelect(index);
        })
    }
    renderItem(child,index){
        const active = (index === this.state.activeIndex);
        return React.cloneElement(child,{
            active,
            ref:active ? "activeItem":"inactiveItem",
            key:child.key ? child.key:index,
            nodeHeight:this.state.itemHeight,
            handleSelect:this.handleSelect.bind(this,index)
        })
    }
    render(){
        return (
            <div className="accordion">{React.Children.map(this.props.children,this.renderItem.bind(this))}</div>
        )
    }
}

Accordion.defaultProps = {
    onSelect:function(){}
};

export class AccordionItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            ddStyle:null
        }
    }
    componentDidUpdate(prevProps){
        const {active} = this.props;
        if(active === true && prevProps.active === false){
            const element = React.findDOMNode(this.refs.accordionContent);
            const targetHeight = element.offsetHeight;
            const initialHeight = 0;
            const self = this;
            // console.log('targetHeight',targetHeight)
            var lastHeight = initialHeight;
            rAF(function interval(){
                lastHeight += 2;
                // console.log('lastHeight',lastHeight)
                self.setState({
                    ddStyle:{
                        height:lastHeight
                    }
                })
                if(lastHeight >= targetHeight){
                    return false;
                }else{
                    rAF(interval)
                }
            })
        }
    }
    render(){
        const {active,key,title,handleSelect} = this.props;
        const classes = classNames("accordion-item",{
            active
        });
        // console.log('ddStyle',this.state.ddStyle)
        return (
            <dl className={classes} key={"accordion-item-" + key}>
                <dt onClick={handleSelect}>{title}</dt>
                <dd ref="accordionContent" style={this.state.ddStyle}>
                <div className="accordion-content">{this.props.children}</div></dd>
            </dl>
        )
    }
}