'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "../common/header.jsx";
import ScrollSpy from "../../src/component/scrollspy.jsx";

class ScrollspyExample extends Component{
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
        return (
            <div className="scrollspy-example">
                <Header title="Scrollspy" backButton={true} />
                <div className="scrollspy-example-inner">
                <div className="shortcut">
                    <span onClick={this.jumpTo.bind(this,"a")} id="anchor-a">A</span>
                    <span onClick={this.jumpTo.bind(this,"b")} id="anchor-b">B</span>
                    <span onClick={this.jumpTo.bind(this,"c")} id="anchor-c">C</span>
                    <span onClick={this.jumpTo.bind(this,"d")} id="anchor-d">D</span>
                    <span onClick={this.jumpTo.bind(this,"e")} id="anchor-e">E</span>
                    <span onClick={this.jumpTo.bind(this,"f")} id="anchor-f">F</span>
                </div>
                <ScrollSpy ref="scrollEl" className="scroll-list">
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
                </ScrollSpy>
                </div>
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    require("../lib/responder");
    ReactDOM.render(<ScrollspyExample />,document.getElementById('scrollspy-example'));
})