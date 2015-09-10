'use strict';

import React,{Component} from "react";
import classNames from "classnames";

class SliderItem extends Component{
    render(){
        const classes = classNames(this.props.className,{
            "slider-item":true,
            "active":this.props.active,
            "pseudo-item":this.props.pseudo
            // active: (this.props.active && !this.props.animateIn) ||
            //     this.props.animateOut,
            // next: this.props.active && this.props.animateIn &&
            //     this.props.direction === 'next',
            // prev: this.props.active && this.props.animateIn &&
            //     this.props.direction === 'prev'
        });
        const width = this.props.style?this.props.style.width+"px":"100%";
        const style = {
            width:width
        }
        return (
            <div className={classes} style={style}>{this.props.children}</div>
        );
    }
}

export default SliderItem;