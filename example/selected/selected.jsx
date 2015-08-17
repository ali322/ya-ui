'use strict'
var React = require("react");
require("./selected.scss");

import {component} from "../../src/index";
let {Selected} = component;

let SelectedForm = React.createClass({
    render(){
        let options = [
            {text:'option 1',value:1},
            {text:'option 2',value:2}
        ];
        return (
            <form action="">
            <div className="form-row">
                <label>choose:</label>
                <Selected options={options}/>
            </div>
            </form>
        );
    }
});

document.addEventListener('DOMContentLoaded',()=>{
    React.render(<SelectedForm />,document.getElementById('selected'));
})