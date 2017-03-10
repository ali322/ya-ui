import React from 'react'
import Header from "../../common/header.jsx";
import DatetimeInput from "@/component/datetimepicker/datetimeinput.jsx";

export default () => {
    const now = Date.now()
    return (
        <div className="datetimepicker-example">
            <Header title="DatetimePicker" backButton />
            <div className="form-row">
                <label>Numberpicker</label>
                <div className="form-row-numberpicker">
                <DatetimeInput value={now} />
                </div>
            </div>
        </div>
    )
}
