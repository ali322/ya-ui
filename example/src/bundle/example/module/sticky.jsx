import React from "react";
import Header from "../../common/header.jsx";
import Sticky from "@/component/sticky.jsx";

export default ()=>{
    return (
        <div className="sticky-example">
            <Header title="Sticky" backButton />
            <Sticky bottom="0">
            <div className="sticky-bottom">im bottom</div>
            </Sticky>
        </div>
    )
}
