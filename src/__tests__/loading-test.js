var chai = require("chai"),
    expect = chai.expect;

describe("loading",function(){
    var React,testUtil;
    beforeEach(function(){
        React = require("react/addons");
        testUtil = React.addons.TestUtils;
    })
    it("expect loading component rendered correct",function(){
        var Loading = React.createFactory(require("../component/loading.jsx"));
        var loading = testUtil.renderIntoDocument(Loading());
        var loadingWrap = testUtil.findRenderedDOMComponentWithClass(loading,'loading-wrap')
        expect(loadingWrap.getDOMNode().children.length).to.equal(1);
    });
});