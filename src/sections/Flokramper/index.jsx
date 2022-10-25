import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

const Flokramper = () => {
    const data = [
        { title: "Request and get API plug-in" },
        { title: "Copy & paste code to create widget" },
        { title: "Start using integration" },
    ]
  return (
    <section className='py-5 py-lg-7 section-gap flokramper'>
        <Container>
            <Row className='justify-content-center'>
                <Col lg="8" xl="7">
                    <div className="section-heading mb-5 mb-lg-6 text-center">
                        <h2 className="text-dark fw-bold fs-3xl fs-md-5xl mb-3">Customize Blokramp for your business</h2>
                        <p>Integrate Blokramp Widget on your website/platform in three easy steps</p>
                    </div>
                </Col>
            </Row>
            <Row className='gy-4'>
                <Col lg="5">
                    {data && 
                    <div className="flokramper__testing">
                        <Accordion defaultActiveKey="accordion-0" className='d-flex flex-column gap-4'>
                            {data.map((item, i) =>(
                            <Accordion.Item key={i} eventKey={`accordion-${i}`} className="rounded-4 overflow-hidden">
                                <Accordion.Header><div className='fs-md fw-bold text-dark'>{i+1}. {item.title}</div></Accordion.Header>
                                <Accordion.Body>
                                    <form>
                                        <div className="form-group mb-3">
                                            <input type="text" className='form-control' placeholder='Your website URL' />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input type="text" className='form-control' placeholder='Your company name' />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input type="text" className='form-control' placeholder='Your business email' />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input type="text" className='form-control' placeholder='Your first name' />
                                        </div>
                                        <div className="form-group mb-4">
                                            <input type="text" className='form-control' placeholder='Your last name' />
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-primary shadow w-100 rounded-pill">Get API Key</button>
                                        </div>
                                    </form>
                                </Accordion.Body>
                            </Accordion.Item>
                            ))}
                        </Accordion>
                    </div>}
                </Col>
                <Col lg="7">
                    <div className="flokramper__frame">
                        <iframe src="//codepen.io/anon/embed/QWwdEed?height=550&amp;theme-id=1&amp;slug-hash=QWwdEed&amp;default-tab=js,result" height="767" scrolling="no" frameborder="0" allowfullscreen allowpaymentrequest name="CodePen Embed QWwdEed" title="CodePen Embed QWwdEed" class="rounded" style={{ width:'100%', overflow: 'hidden' }}>CodePen Embed Fallback</iframe>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Flokramper