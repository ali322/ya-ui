import React from "react";
import Header from "../../common/header.jsx";
import { SlideTabs, SlideTabsItem } from "@/component/slidetabs.jsx";

export default ()=>{
    let tabsItems = [];
    for (let i = 0; i < 5; i++) {
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
