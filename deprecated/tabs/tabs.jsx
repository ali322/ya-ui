'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "../common/header.jsx";
import {Tabs,TabsItem} from "../../src/component/tabs.jsx";

class TabsExample extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="tabs-example">
                <Header title="Tabs" backButton={true} />
                <div className="tabs-example-inner">
                    <Tabs>
                        <TabsItem title="Section 1">
                            <p>this is Section 1 content.</p>
                        </TabsItem>
                        <TabsItem title="Section 2">
                            <p>this is Section 2 content.</p>
                        </TabsItem>
                        <TabsItem title="Section 3">
                            <p>this is Section 3 content.</p>
                        </TabsItem>
                    </Tabs>
                </div>
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    require("../lib/responder");
    ReactDOM.render(<TabsExample />,document.getElementById('tabs-example'));
})