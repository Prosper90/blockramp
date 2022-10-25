import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import appstore from '../../assets/app-store.svg';
import googleplay from '../../assets/google-play.svg';
import Shape1 from './assets/footer-shape-1.svg';
import Shape2 from './assets/footer-shape-2.svg';

// Social Icons
import socialTwitter from '../../assets/social/twitter.svg';
import socialFacebook from '../../assets/social/facebook.svg';
import socialLinkedin from '../../assets/social/linkedin.svg';
import socialGithub from '../../assets/social/github.svg';
import socialVectory from '../../assets/social/vector.svg';
import socialBall from '../../assets/social/ball.svg';

const Footer = () => {
    const data = {
        menu: [
            {
                name: 'Overview',
                url: '/overview',
            },
            {
                name: 'Features',
                url: '/features',
            },
            {
                name: 'Pricing',
                url: '/pricing',
            },
            {
                name: 'Careers',
                url: '/careers',
            },
            {
                name: 'Help',
                url: '/help',
            },
            {
                name: 'Privacy',
                url: '/privacy',
            },
        ],
        social: [
            {
                name: 'Twitter',
                icon: socialTwitter,
                url: 'https://twitter.com/',
            },
            {
                name: 'Facebook',
                icon: socialFacebook,
                url: 'https://facebook.com/',
            },
            {
                name: 'Linkedin',
                icon: socialLinkedin,
                url: 'https://linkedin.com/',
            },
            {
                name: 'Github',
                icon: socialGithub,
                url: 'https://github.com/',
            },
            {
                name: 'Vectory',
                icon: socialVectory,
                url: 'https://github.com/',
            },
            {
                name: 'socialBall',
                icon: socialBall,
                url: 'https://twitter.com/',
            },
        ]
    }
  return (
    <footer className='footer pt-6 pb-4'>
        <img src={Shape1} alt="Shape1" className="shape-1"/>
        <img src={Shape2} alt="Shape2" className="shape-2"/>
        <Container>
            <Row className='gy-4 gx-lg-5 gx-xl-6'>
                <Col md="6" lg="3" xl="4">
                    <div className="footer-widget pe-xl-4">
                        <div className="mb-3 mb-lg-4">
                            <img src={logo}/>
                        </div>
                        <div className="fs-xs" style={{ '--bs-font-size' : '15px' }}>
                            <p className='mb-4'>Blokramp is an on-and-off-ramp solution tailored for individual and institutional usage. Our Whitelabel on-ramp solution is designed to scale your business.</p>
                            <div>© Copyright 2022, All Rights Reserved</div>
                        </div>
                    </div>
                </Col>
                <Col md="6" lg="3" xl="3">
                    <div className="footer-widget">
                        <h5 className='text-dark fw-regular mb-4 mb-lg-5 fs-md'>Contacts</h5>

                        <ul className="list-unstyled d-flex flex-column gap-3 fs-xs">
                            <li><Link to={'/'} className="text-muted">Live chat</Link></li>
                            <li><Link to={'/'} className="text-muted">support@blokramp.com</Link></li>
                            <li>Amsterdam, ‘s-Gravenhekje 1A   1011 TG, The Netherlands</li>
                        </ul>

                    </div>
                </Col>
                <Col md="6" lg="3" xl="3">
                    <div className="footer-widget">
                        <h5 className='text-dark fw-regular mb-4 mb-lg-5 fs-md'>Contacts</h5>

                        <ul className="list-unstyled d-flex flex-column gap-3 fs-xs">
                            <li><Link to={'/'} className="text-muted">Our Courses</Link></li>
                            <li><Link to={'/'} className="text-muted">Quality Management</Link></li>
                            <li><Link to={'/'} className="text-muted">Student Support</Link></li>
                            <li><Link to={'/'} className="text-muted">Student Management</Link></li>
                        </ul>

                    </div>
                </Col>
                <Col md="6" lg="3" xl="2">
                    <div className="footer-widget">
                        <h5 className='text-dark fw-regular mb-4 mb-lg-5 fs-md'>Company</h5>

                        <ul className="list-unstyled d-flex flex-md-column gap-3 fs-xs">
                            <li><Link to={'/'} className="text-muted">Terms & Conditions</Link></li>
                            <li><Link to={'/'} className="text-muted">Privacy Policy</Link></li>
                        </ul>

                    </div>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer