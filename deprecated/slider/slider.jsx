'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import Header from "../common/header.jsx";
import Slider from "../../src/component/slider/slider.jsx";
import Slide from "../../src/component/slider/slide.jsx";

class SliderExample extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="slider-example">
                <Header title="Slider" backButton={true} />
                <div className="slider-example-inner">
                <div className="md-card">
                    <div className="md-card-title">horizontal</div>
                    <Slider effect="roll" autoPlay={true} speed={200}>
                        <Slide key="slide-1"><img src="/asset/image/nature-q-c-640-480-2.jpg" /></Slide>
                        <Slide key="slide-2"><img src="/asset/image/nature-q-c-640-480-4.jpg" /></Slide>
                        <Slide key="slide-3"><img src="/asset/image/nature-q-c-640-480-6.jpg" /></Slide>
                    </Slider>
                </div>
                <div className="md-card slider-vertical">
                    <div className="md-card-title">vertical</div>
                    <Slider effect="roll" autoPlay={true} speed={200} oriention="vertical">
                        <Slide key="slide-1"><img src="/asset/image/sports.jpeg" /></Slide>
                        <Slide key="slide-2"><img src="/asset/image/sports-2.jpeg" /></Slide>
                        <Slide key="slide-3"><img src="/asset/image/sports-3.jpeg" /></Slide>
                    </Slider>
                </div>
                <div className="md-card">
                    <div className="md-card-title">fade</div>
                    <Slider effect="fade" autoPlay={true} speed={200}>
                        <Slide key="slide-1"><img src="/asset/image/nature-q-c-640-480-2.jpg" /></Slide>
                        <Slide key="slide-2"><img src="/asset/image/nature-q-c-640-480-4.jpg" /></Slide>
                        <Slide key="slide-3"><img src="/asset/image/nature-q-c-640-480-6.jpg" /></Slide>
                    </Slider>
                </div>
                </div>
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    require("../lib/responder");
    ReactDOM.render(<SliderExample />,document.getElementById('slider-example'));
})