import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Banner from './banner';

const GrowUsers = () => {
  return (
    <section className='py-5 py-lg-7'>
        <Container>
            <Row className="gy-5 justify-content-center align-items-center">
                <Col sm="12" md="10" lg="6" xl="6">
                    <div className='pe-lg-4 pe-xl-5 text-center text-start'>
                        <h2 className="text-dark fw-bold fs-3xl fs-md-5xl mb-3">Grow your business with the best crypto payment solution</h2>
                        <div className="mb-4 mb-lg-5">
                            <p>Our solution can boast more than 70% increase on your crypto payment users. We recommend the best on-ramps (vendor) that suit every transaction your users initiate at the best and most sensible rate possible.</p>
                        </div>

                        <button className="btn btn-primary rounded-pill shadow fw-bold">Get Started</button>
                    </div>
                </Col>
                <Col lg="6">
                    <div className="grow-users--banner">
                        <Banner />
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default GrowUsers