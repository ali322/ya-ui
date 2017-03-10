import React from "react";
import Header from "../../common/header.jsx";
import Slider from "@/component/slider/slider.jsx";
import Slide from "@/component/slider/slide.jsx";

export default ()=>{
    return (
        <div className="slider-example">
            <Header title="Slider" backButton />
            <div className="slider-example-inner">
            <div className="md-card">
                <div className="md-card-title">horizontal</div>
                <Slider effect="roll" autoPlay speed={200}>
                    <Slide key="slide-1"><img alt="" src="/asset/image/nature-q-c-640-480-2.jpg" /></Slide>
                    <Slide key="slide-2"><img alt="" src="/asset/image/nature-q-c-640-480-4.jpg" /></Slide>
                    <Slide key="slide-3"><img alt="" src="/asset/image/nature-q-c-640-480-6.jpg" /></Slide>
                </Slider>
            </div>
            <div className="md-card slider-vertical">
                <div className="md-card-title">vertical</div>
                <Slider effect="roll" autoPlay speed={200} oriention="vertical">
                    <Slide key="slide-1"><img alt="" src="/asset/image/sports.jpeg" /></Slide>
                    <Slide key="slide-2"><img alt="" src="/asset/image/sports-2.jpeg" /></Slide>
                    <Slide key="slide-3"><img alt="" src="/asset/image/sports-3.jpeg" /></Slide>
                </Slider>
            </div>
            <div className="md-card">
                <div className="md-card-title">fade</div>
                <Slider effect="fade" autoPlay speed={200}>
                    <Slide key="slide-1"><img alt="" src="/asset/image/nature-q-c-640-480-2.jpg" /></Slide>
                    <Slide key="slide-2"><img alt="" src="/asset/image/nature-q-c-640-480-4.jpg" /></Slide>
                    <Slide key="slide-3"><img alt="" src="/asset/image/nature-q-c-640-480-6.jpg" /></Slide>
                </Slider>
            </div>
            </div>
        </div>
    )
}
