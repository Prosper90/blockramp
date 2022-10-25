import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import image1 from './assets/1.svg';
import image2 from './assets/2.svg';
import image3 from './assets/3.svg';
import image4 from './assets/4.svg';
import image5 from './assets/5.svg';

const Partners = () => {
    const data = [
        { icon: image1 },
        { icon: image2 },
        { icon: image3 },
        { icon: image4 },
        { icon: image5 },

        { icon: image1 },
        { icon: image2 },
        { icon: image3 },
        { icon: image4 },
        { icon: image5 },
    ]
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

  return (
    <section className='py-5 py-lg-7 bg-light text-center'>
        <Container>
            <Row>
                <Col lg="12">
                    <div className="partners__heading mb-5">
                        <h5 className='text-dark fs-xl'>Top brands admire our on-ramp solution</h5>
                    </div>
                    <div className="partners__sliders text-center">
                        <Slider {...settings}>
                            {data && data.map((item, i) =>(
                            <div className='partners__item p-4' key={i}>
                                <img src={item.icon} className="img-fluid d-inline-block" alt="Image Item"/>
                            </div>
                            ))}
                        </Slider>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Partners