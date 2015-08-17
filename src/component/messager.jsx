'use strict'
import React from "react";
import classNames from "classnames";

class Messager extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            active:props.active
        }
    }
    close(){
        this.setState({
            active:false
        })
    }
    render(){
        const {title,content} = this.props;
        const classes = classNames({
            ['messager-wrap']:true,
            ['active']:this.props.active
        });

        const innerClasses = classNames({
            messager:true,
            ['success-messager']:this.props.level == 'success',
            ['error-messager']:this.props.level == 'error',
            ['info-messager']:this.props.level == 'info'
        });

        return (
            <div className={classes}>
            <div classNames={innerClasses}>
                <button className="close-messager" onClick={this.close}><span className="icon iconfont icon-close"></span></button>
                {title && <h3>{title}</h3>}
                <div className="messager-content">{content}</div>
            </div>
            </div>
        );
    }
}

export default Messager;