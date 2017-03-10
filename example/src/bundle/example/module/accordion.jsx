import React from "react"
import Header from "../../common/header.jsx"
import Accordion from "@/component/accordion.jsx"

export default ()=>{
        return (
            <div className="accordion-example">
                <Header title="Accordion" backButton />
                <div className="accordion-example-inner">
                <Accordion>
                <Accordion.Item title="Section 1">this is section 1</Accordion.Item>
                <Accordion.Item title="Section 2">this is section 2</Accordion.Item>
                <Accordion.Item title="Section 3">this is section 3</Accordion.Item>
                </Accordion>
                </div>
            </div>
        )
}
