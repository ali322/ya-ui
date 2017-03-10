import React from "react";
import Header from "../../common/header.jsx";
import Numberpicker from "@/component/numberpicker.jsx";

export default ()=>{
    return (
        <div className="numberpicker-example">
            <Header title="Numberpicker" backButton />
            <div className="form-row">
                <label>Numberpicker</label>
                <div className="form-row-numberpicker">
                <Numberpicker />
                </div>
            </div>
        </div>
    )
}
