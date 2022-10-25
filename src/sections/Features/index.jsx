import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import creative from '../../assets/Creative.svg';
import ecoSystem from '../../assets/eco-system.svg';
import getRewarded from '../../assets/get-rewarded.svg';

const Features = () => {
    const data = [
        {
            banner: {
                url: creative
            },
            content: {
                heading: "Non-custodial Wallet: Secure & Reliable",
                body: "Buy, store, and swap assets anytime, anywhere. NO KYC!",
            },
            button: {
                name: "Get started",
                icon: <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.2931 1.70711C13.9026 1.31658 13.9026 0.683417 14.2931 0.292893C14.6837 -0.0976311 15.3168 -0.0976311 15.7074 0.292893L21.7073 6.29289C22.0979 6.68342 22.0979 7.31658 21.7073 7.70711L15.7074 13.7071C15.3168 14.0976 14.6837 14.0976 14.2931 13.7071C13.9026 13.3166 13.9026 12.6834 14.2931 12.2929L18.586 7.99998H1.01103C0.452653 7.99998 0 7.55227 0 6.99998C0 6.4477 0.452653 5.99998 1.01103 5.99998H18.586L14.2931 1.70711Z" fill="#FB9B04"/></svg>,
                url: "/slug"
            }
        },
        {
            right: true,
            banner: {
                url: ecoSystem
            },
            content: {
                heading: "Explore the Blithe Ecosystem",
                body: "The Blithe Ecosystem presents many possibilities in DeFi, including lending and borrowing, Blithe Mastercard & Visa Card, NFC Payments, API Integration & SDK, Blithe Widget, Staking & High Yields.",
            },
            button: {
                name: "Get started",
                icon: <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.2931 1.70711C13.9026 1.31658 13.9026 0.683417 14.2931 0.292893C14.6837 -0.0976311 15.3168 -0.0976311 15.7074 0.292893L21.7073 6.29289C22.0979 6.68342 22.0979 7.31658 21.7073 7.70711L15.7074 13.7071C15.3168 14.0976 14.6837 14.0976 14.2931 13.7071C13.9026 13.3166 13.9026 12.6834 14.2931 12.2929L18.586 7.99998H1.01103C0.452653 7.99998 0 7.55227 0 6.99998C0 6.4477 0.452653 5.99998 1.01103 5.99998H18.586L14.2931 1.70711Z" fill="#FB9B04"/></svg>,
                url: "/slug"
            }
        },
        {
            banner: {
                url: getRewarded
            },
            content: {
                heading: "Buy the Blithe Token (BLT), Get rewarded!",
                body: "You get huge incentives when you buy and spend our utility/unique exchange token, $BLT on Blithe Wallet. You receive instant discount on liquidity pools, decentralized exchange, and more.",
            },
            button: {
                name: "Get started",
                icon: <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.2931 1.70711C13.9026 1.31658 13.9026 0.683417 14.2931 0.292893C14.6837 -0.0976311 15.3168 -0.0976311 15.7074 0.292893L21.7073 6.29289C22.0979 6.68342 22.0979 7.31658 21.7073 7.70711L15.7074 13.7071C15.3168 14.0976 14.6837 14.0976 14.2931 13.7071C13.9026 13.3166 13.9026 12.6834 14.2931 12.2929L18.586 7.99998H1.01103C0.452653 7.99998 0 7.55227 0 6.99998C0 6.4477 0.452653 5.99998 1.01103 5.99998H18.586L14.2931 1.70711Z" fill="#FB9B04"/></svg>,
                url: "/slug"
            }
        },
    ]
  return (
    <section className="">
        <Container>
            {data && data.map((item, i) =>(
            <Row className="gy-5 mb-7 align-items-center">
                <div  className={`${item.right ? 'offset-lg-1 col-md-7 col-lg-6' : 'col-md-5'}`}>
                    {item.banner &&
                    <div className="thumb-area">
                        <img src={item.banner.url}  className="img-fluid" alt="Image"/>
                    </div> }
                </div>
                <div className={`${item.right ? 'order-md-first col-md-5 offset-lg-1 col-lg-4' : 'col-md-5 col-lg-4 offset-lg-1'}`}>
                    <div className="content-area">
                        {item.content && item.content.heading && <h2 className="fs-5xl fw-bold ls-xxs text-dark mb-3 mb-lg-4">{item.content.heading}</h2>}
                        {item.content && item.content.body && <p className="mb-3 mb-lg-4">{item.content.body}</p>}
                        {item.button && item.content.body && <a href={item.button.url} className="link-warning fs-lg">Get started {item.button.icon}</a>}
                    </div>
                </div>
            </Row>
            ))}
        </Container>
    </section>
  )
}

export default Features