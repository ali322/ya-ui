import React from "react";
import Header from "../../common/header.jsx";
import Selected from "@/component/selected/selected.jsx";
import SelectedSlide from "@/component/selected/selectedslide.jsx"

export default () => {
    const options = [
        { label: 'option 1', value: 1 },
        { label: 'option 2', value: 2 }
    ];
    return (
        <div className="selected-example">
                <Header title="Selected" backButton />
                <div className="form-row">
                    <label>Selected</label>
                    <Selected options={options}/>
                </div>
                <div className="form-row">
                    <label>SelectedSlider</label>
                    <SelectedSlide options={options}/>
                </div>
            </div>
    );
}
