import React, { Component } from "react";
import Header from "../../common/header.jsx";
import Checkbox from "@/component/form/checkbox.jsx";
import Radio from "@/component/form/radio.jsx";

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: "male",
            habits: []
        }
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
        this.handleRadioChange = this.handleRadioChange.bind(this)
    }
    handleRadioChange(value, e) {
        this.setState({
            sex: value,
        })
    }
    handleCheckboxChange(value, checked, e) {
        let { habits } = this.state;
        if (habits.indexOf(value) === -1) {
            habits.push(value)
        } else {
            habits.splice(habits.indexOf(value))
        }
        this.setState({
            habits
        })
    }
    render() {
        return (
            <div className="form-example">
                <Header title="Form" backButton />
                <div className="form-row">
                    <label>Checkbox</label>
                    <div className="form-row-radio">
                        <Checkbox onChange={()=>this.handleCheckboxChange('Book')} />
                        <b>Book</b>
                        <Checkbox onChange={()=>this.handleCheckboxChange('Game')} />
                        <b>Game</b>
                    </div>
                </div>
                <div className="form-row">
                    <label>Radio</label>
                    <div className="form-row-radio">
                        <Radio name="sex" checked onChange={()=>this.handleRadioChange('male')} />
                        <b>male</b>
                        <Radio name="sex" onChange={()=>this.handleRadioChange('female')} />
                        <b>female</b>
                    </div>
                </div>
                <div className="md-card">
                <h3>Result</h3>
                <p>Sex<b>{this.state.sex}</b></p>
                <p>Habits<b>{this.state.habits.join(",")}</b></p>
                </div>
            </div>
        )
    }
}
