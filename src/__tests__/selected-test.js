var chai = require("chai"),
    expect = chai.expect;

describe("selected", function() {
    var React, testUtil;
    beforeEach(function() {
        React = require("react/addons");
        testUtil = React.addons.TestUtils;
    })
    it("expect selected component rendered correct", function() {
        var Selected = React.createFactory(require("../component/selected.jsx"));

        let options = [
            {text:'option 1',value:1},
            {text:'option 2',value:2}
        ];
        var selected = testUtil.renderIntoDocument(Selected({options:options}));
        var selectedWrap = testUtil.findRenderedDOMComponentWithClass(selected, 'yaui-selected')
        expect(selectedWrap.getDOMNode().children.length).to.equal(3);
    });
});
