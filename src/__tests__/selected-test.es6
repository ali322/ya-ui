'use strict';
var React = require("react");
var ReactTestUtils = require("react/lib/ReactTestUtils");
var Selected = require("../component/selected/selected.jsx");
var expect = require("expect");

describe("selected", function() {
    var options;
    beforeEach(function(){
        options = [{
            text: 'option 1',
            value: 1
        }, {
            text: 'option 2',
            value: 2
        }];
    })
    it("expect selected component rendered correct", function() {
        let renderer = ReactTestUtils.createRenderer();
        renderer.render(<Selected options={options}/>);
        let output = renderer.getRenderOutput();
        expect(output.type).toBe("div");
        let dropdown = output.props.children;
        let dropdownContent  = dropdown.props.children[1];
        expect(dropdownContent.props.children.length).toBe(2);
    });
    it("expect selected component event handler work properly",function(){
        let selectedComponent = ReactTestUtils.renderIntoDocument(
            <Selected options={options}/>
        )
        let dropdownComponent = selectedComponent.refs.dropdown;
        var dropdownTrigger = dropdownComponent.refs.dropdownTrigger;
        // var selectedBtn = ReactTestUtils.findRenderedDOMComponentWithTag(
        //     renderedSelected,"button");
        ReactTestUtils.Simulate.click(dropdownTrigger);
        expect(dropdownComponent.state.open).toBe(true);
    })
});
