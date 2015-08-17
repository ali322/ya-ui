'use strict'
import React from "react";
import classNames from "classnames";

class Dialog extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const classes = classNames({
            ['dialog-wrap']:true,
            ['active']:this.props.active
        });

        const {title,content,
            handleCancel,handleConfirm,cancelText,confirmText} = this.props;
        return (
            <div className={classes}>
            <div className="dialog">
            {title && <h3>{title}</h3>}
            <div className="dialog-content">{content}</div>
            <div className="dialog-btns">
            {cancelText && <button onClick={handleCancel}>{cancelText}</button>}
            {confirmText && <button onClick={handleConfirm}>{confirmText}</button>}
            </div>
            </div>
            </div>
        );
    }
}

export default Dialog;