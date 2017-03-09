import React, { Component } from 'react'
import { Link } from 'react-router'
import Header from '../../common/header.jsx'

class Index extends Component {
    render() {
        return (
            <div className="index-example">
                <Header title="Ya-UI" />
                <table className="md-data-table">
                    <thead>
                    <tr>
                        <th>Component</th>
                        <th>Example</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Selected</td>
                        <td><Link to="/example/selected">example</Link></td>
                    </tr>
                    <tr>
                        <td>Popup</td>
                        <td><Link to="/example/popup">example</Link></td>
                    </tr>
                    <tr>
                        <td>NumberPicker</td>
                        <td><Link to="/example/numberpicker">example</Link></td>
                    </tr>
                    <tr>
                        <td>DatetimePicker</td>
                        <td><Link to="/example/datetimepicker">example</Link></td>
                    </tr>
                    <tr>
                        <td>Form</td>
                        <td><Link to="/example/form">example</Link></td>
                    </tr>
                    <tr>
                        <td>Slider</td>
                        <td><Link to="/example/slider">example</Link></td>
                    </tr>
                    <tr>
                        <td>Sticky</td>
                        <td><Link to="/example/sticky">example</Link></td>
                    </tr>
                    <tr>
                        <td>ScrollNav</td>
                       <td><Link to="/example/selected">scrollnav</Link></td>
                    </tr>
                    <tr>
                        <td>Accordion</td>
                       <td><Link to="/example/selected">accordion</Link></td>
                    </tr>
                    <tr>
                        <td>Tabs</td>
                        <td><Link to="/example/tabs">example</Link></td>
                    </tr>
                    <tr>
                        <td>SlideTabs</td>
                        <td><Link to="/example/slidetabs">example</Link></td>
                    </tr>
                    <tr>
                        <td>More</td>
                        <td><Link to="/example/more">example</Link></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Index
