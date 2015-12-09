'use strict';

import React,{Component} from "react";

class Header extends Component{
    handleBack(){
        window.history.back()
    }
    render(){
        const {title,backButton} = this.props;
        return (
            <header>
                {backButton?<span className="back-button">
                <button onClick={this.handleBack.bind(this)}>Back</button>
                </span>:null}
                <h3>{title}</h3>
                {backButton?<span className="more-button"></span>:null}
            </header>
        )
    }
}

Header.defaultProps = {
    title:"Header",
    backButton:false
}

export default Header;