import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Exprerience = () => {
    const data = [
        {
            heading: "Create excellent user experience with Blokramp",
            list: [
                { title: 'Buy crypto with fiat without exiting the platform' },
                { title: 'Select best rates based on excellent recommendations' },
                { title: 'Save more on fees' },
                { title: 'Simple and intuitive platform. Easy to use and navigate' },
                { title: 'Supports major fiat' },
                { title: 'Easy-to-integrate API and SDK. Customizable widget.' },
            ]
        },
        {
            heading: "Best buying experience for your users",
            list: [
                { title: 'Users can buy crypto without leaving your app/website' },
                { title: 'Choice between fiat Blokramps based on fees, speed or KYC requirements.' },
                { title: 'Great UX, thanks to our simple, intuitive widget' },
                { title: 'Always the best fees' },
                { title: 'Blokramper gets improved rates from fiat blokramps.' },
            ]
        },
    ]
  return (
    <section className="experience bg-light py-5 section-gap">
        <Container>
            <Row className='experience-row gy-5'>
                {data && data.map((item, i ) =>(
                <Col key={i} lg="6">
                    <div className="card shadow-sm rounded-4 h-100">
                        <div className="card-body p-4 p-lg-5">
                            <div className="text-heading text-center">
                                <h2 className="mb-4 mb-lg-5 text-dark fw-bold fs-3xl lh-md">{item.heading}</h2>
                            </div>
                            {item.list && 
                            <ul className="list-unstyled mb-0 list-check">
                                {item.list.map((sub, i)=>(
                                <li key={i}>{sub.title}</li>
                                ))}
                            </ul>
                            }
                        </div>
                    </div>
                </Col>
                ))}
            </Row>
        </Container>
    </section>
  )
}

export default Exprerience