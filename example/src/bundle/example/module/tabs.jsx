import React from "react";
import Header from "../../common/header.jsx";
import { Tabs, TabsItem } from "@/component/tabs.jsx";

export default ()=>{
    return (
        <div className="tabs-example">
            <Header title="Tabs" backButton />
            <div className="tabs-example-inner">
                <Tabs>
                    <TabsItem title="Section 1">
                        <p>this is Section 1 content.</p>
                    </TabsItem>
                    <TabsItem title="Section 2">
                        <p>this is Section 2 content.</p>
                    </TabsItem>
                    <TabsItem title="Section 3">
                        <p>this is Section 3 content.</p>
                    </TabsItem>
                </Tabs>
            </div>
        </div>
    )
}
