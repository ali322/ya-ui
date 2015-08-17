'use strict'
import React from "react";
import classNames from "classnames";

class Loading extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const classes = classNames({
            ['loading-wrap']:true,
            ['active']:this.props.active
        });
        return (
            <div className={classes}>
                <div className="loading-content"><span className="icon iconfont icon-loading"></span><div className="loading-hint">{this.state.hint}</div></div>
            </div>
        )
    }
}

export default Loading;