import React, { Component } from "react";
import Header from "../../common/header.jsx";
import Popup from "@/component/popup.jsx";

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftActive: false,
            rightActive: false,
            bottomActive: false
        }
        this.hideAll = this.hideAll.bind(this)
        this.toggleBottom = this.toggleBottom.bind(this)
        this.toggleLeft = this.toggleLeft.bind(this)
        this.toggleRight = this.toggleRight.bind(this)
    }
    toggleLeft(e) {
        e && e.stopPropagation()
        this.hideAll()
        this.setState({
            leftActive: !this.state.leftActive
        });
    }
    toggleRight(e) {
        e && e.stopPropagation()
        this.hideAll()
        this.setState({
            rightActive: !this.state.rightActive
        });
    }
    toggleBottom(e) {
        e && e.stopPropagation()
        this.hideAll()
        this.setState({
            bottomActive: !this.state.bottomActive
        });
    }
    hideAll(e) {
        e && e.preventDefault()
        this.setState({
            leftActive: false,
            rightActive: false,
            bottomActive: false
        })
    }
    render() {
        const { leftActive, rightActive, bottomActive } = this.state;
        return (
            <div className="popup-example" onClick={this.hideAll}>
            <Header title="Popup" backButton />
            <div className="popup-bottons">
                <button onClick={this.toggleLeft} className="md-button">Popup Left</button>
                <button onClick={this.toggleRight} className="md-button">Popup Right</button>
                <button onClick={this.toggleBottom} className="md-button">Popup Bottom</button>
            </div>
            <Popup active={leftActive} direction="left">
                <div className="md-card">
                <h3 className="md-h3">Title</h3>
                <p>Popup Content</p>
                </div>
            </Popup>
            <Popup active={rightActive} direction="right">
                <div className="md-card">
                <h3 className="md-h3">Title</h3>
                <p>Popup Content</p>
                </div>
            </Popup>
            <Popup active={bottomActive} direction="bottom">
                <div className="md-card">
                <h3 className="md-h3">Title</h3>
                <p>Popup Content</p>
                </div>
            </Popup>
            </div>
        );
    }
}
