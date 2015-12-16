'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "../common/header.jsx";
import ScrollNav,{ScrollNavbar} from "../../src/component/scrollnav.jsx";

class ScrollNavExample extends Component{
    constructor(props){
        super(props);
    }
    jumpTo(keyword,e){
        Array.prototype.forEach.call(e.currentTarget.parentNode.children,(anchorNode)=>{
            // dom.removeClass(anchorNode,"active");
        });
        // dom.addClass(e.currentTarget,"active");
        const scrollEl = ReactDOM.findDOMNode(this.refs.scrollEl);
        const targetEl = scrollEl.querySelector('[data-anchor="anchor-'+keyword+'"]')
        if(!targetEl){
            e.stopPropagation();
            return;
        }
        const scrollDistance = targetEl.offsetTop
        // dom.smoothScroll(scrollEl,{
        //     position:scrollDistance
        // });
        // this.setState({
        //     alertActive:true,
        //     alertContent:keyword.toUpperCase()
        // });
        // setTimeout(()=>{
        //     this.setState({
        //         alertActive:false
        //     });
        // },2000);
    }
    render(){
        const scrollNavbar = (
        )
        return (
            <div className="scrollnav-example">
                <Header title="Scrollspy" backButton={true} />
                <div className="scrollnav-example-inner">
                <ScrollNavbar className="shortcut" id="shortcut">
                    <span onClick={this.jumpTo.bind(this,"a")} id="anchor-a">A</span>
                    <span onClick={this.jumpTo.bind(this,"b")} id="anchor-b">B</span>
                    <span onClick={this.jumpTo.bind(this,"c")} id="anchor-c">C</span>
                    <span onClick={this.jumpTo.bind(this,"d")} id="anchor-d">D</span>
                    <span onClick={this.jumpTo.bind(this,"e")} id="anchor-e">E</span>
                    <span onClick={this.jumpTo.bind(this,"f")} id="anchor-f">F</span>
                </ScrollNavbar>
                <ScrollNav ref="scrollEl" navbar="#shortcut">
                    <div className="anchor-point" data-anchor="anchor-a">
                    <h5>A</h5>
                    <ul>
                        <li className="active"><b>ayilian</b><span className="iconfont icon-ok"></span></li>
                        <li>baitu</li>
                        <li>AVO</li>
                    </ul>
                    </div>
                    <div className="anchor-point" data-anchor="anchor-b">
                    <h5>B</h5>
                    <ul>
                        <li className="active"><b>ayilian</b><span className="iconfont icon-ok"></span></li>
                        <li>baitu</li>
                        <li>AVO</li>
                    </ul>
                    </div>
                    <div className="anchor-point" data-anchor="anchor-c">
                    <h5>C</h5>
                    <ul>
                        <li className="active"><b>ayilian</b><span className="iconfont icon-ok"></span></li>
                        <li>baitu</li>
                        <li>AVO</li>
                    </ul>
                    </div>                    
                    <div className="anchor-point" data-anchor="anchor-d">
                    <h5>D</h5>
                    <ul>
                        <li className="active"><b>ayilian</b><span className="iconfont icon-ok"></span></li>
                        <li>baitu</li>
                        <li>AVO</li>
                    </ul>
                    </div>
                    <div className="anchor-point" data-anchor="anchor-e">
                    <h5>E</h5>
                    <ul>
                        <li className="active"><b>ayilian</b><span className="iconfont icon-ok"></span></li>
                        <li>baitu</li>
                        <li>AVO</li>
                    </ul>
                    </div>
                </ScrollNav>
                </div>
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    require("../lib/responder");
    ReactDOM.render(<ScrollNavExample />,document.getElementById('scrollnav-example'));
})