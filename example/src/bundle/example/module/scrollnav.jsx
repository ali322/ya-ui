import React from "react";
import Header from "../../common/header.jsx";
import ScrollNav from "@/component/scrollnav.jsx";

export default ()=>{
        const navbarRenderer = ()=>{
            let shortcuts = ["a","b","c","d","e"];
            return shortcuts.map((v)=>{
                return (
                    <span>{v}</span>
                )
            })
        }
        return (
            <div className="scrollnav-example">
                <Header title="Scrollspy" backButton />
                <div className="scrollnav-example-inner">
                <ScrollNav className="scrollnav-example-list" navbarRenderer={navbarRenderer}>
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
