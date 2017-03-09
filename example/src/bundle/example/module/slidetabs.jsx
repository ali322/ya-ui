'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "../common/header.jsx";
import {SlideTabs,SlideTabsItem} from "../../src/component/slidetabs.jsx";

Object.assign = Object.assign || require('object-assign')

class SlideTabsExample extends Component{
    render(){
        let tabsItems = [];
        for(let i = 0;i < 5;i++){
            let navigator = (
                <span>
                    <a href="#">{i}</a>
                </span>
            )
            tabsItems.push(
                <SlideTabsItem navigator={()=>navigator} key={i}>
                <h5>{i}</h5>
                <ul>
                    <li>ayilian</li>
                    <li>baitu</li>
                    <li>AVO</li>
                </ul>
                </SlideTabsItem>
            )
        }
        return (
            <div className="slidetabs-example">
                <Header title="SlideTabs" backButton={true} />
                <div className="slidetabs-example-inner">
                <SlideTabs axis="x" navbarSlidable={true}>
                {tabsItems}
                </SlideTabs>
                </div>
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    require("../lib/responder");
    ReactDOM.render(<SlideTabsExample />,document.getElementById('slidetabs-example'));
})