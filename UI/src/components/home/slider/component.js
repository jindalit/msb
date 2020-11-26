import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default (props) => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const items = []
    if (props.list) {
        for (let i = 0; i < props.list.length; i++) {
            items.push(<div key={i}>
                <div class="slider-inner">
                    <div class="slider-img">
                        <img src="images/img1.jpg" />

                        <div class="slider-content">
                            <p>{props.list[i].description}</p>
                            <a href="" class="slider-button">Read More </a>
                        </div>
                    </div>
                    <h6>{props.list[i].name}</h6>
                </div>
            </div>)
        }
    }
    return (
        <div class="project-section">
            <div class="container">
                <div class="project-section-inner">
                    <h1>Projects </h1>
                    <div style={{ 'width': '1130px' }}>
                        <Carousel responsive={responsive}>
                            {items}
                        </Carousel>
                    </div>
                </div>
            </div >
        </div >
    )
}