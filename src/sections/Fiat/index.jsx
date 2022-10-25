import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import BGShape from './assets/banner.svg';

const Fiat = () => {
    const data={


        list: [
            {
                count: 190,
                title: "Countries",
            },
            {
                count: 95,
                title: "Fiat Currencies",
            },
            {
                count: 200,
                title: "Cryptocurrencies",
            },
            {
                count: 18,
                title: "Payment Methods",
            },
        ]
    }
  return (
    <section className='py-5 py-lg-7 section-gap fiat'>
        <Container>
            <Row className='justify-content-center'>
                <Col lg="8" xl="8">
                    <div className="section-heading mb-5 mb-lg-6 text-center">
                        <h2 className="text-dark fw-bold lh-md fs-3xl fs-md-5xl mb-3">A trusted fiat-to-crypto <br className="d-none d-xl-block" />solution for your business</h2>
                        <p>Use our standard API to customize & build Whitelabel crypto payments on your platform/website. Get crypto, receive fiat—using our free widget; launch in a few minutes</p>
                    </div>
                </Col>
            </Row>
            <Row className='mb-6 mb-lg-7'>
                <Col sm="12">
                    <div className="fiat-banner">
                        <img src={BGShape} alt="" className='img-fluid'/>
                    </div>
                </Col>
            </Row>
            <Row className='g-4 g-xl-5 text-center'>
                {data && data.list && data.list.map((item, i) => (
                <Col key={i} sm="6" xl="3">
                    <div className="card shadow rounded-4">
                        <div className="card-body py-md-4">
                            <h2 className='text-primary fw-light fs-5xl fs-lg-6xl fs-xxl-7xl lh-xs'>{item.count}+</h2>
                            <div className='fs-lg-lg fs-xxl-xl'>{item.title}</div>
                        </div>
                    </div>
                </Col>
                ))}
            </Row>
        </Container>
    </section>
  )
}

export default Fiat;