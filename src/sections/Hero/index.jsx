import React, { useState, useEffect }  from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import appStore from './assets/app-store.svg';
import playStore from './assets/play-store.svg';
import Xicon from '../FeesPricing/assets/xicon.png';
import AccpetPayments from './assets/accept.svg';
import { motion } from 'framer-motion';
import { Tab, Tabs } from 'react-bootstrap';
import Select, { components } from 'react-select';
import currencyUSD from './assets/currency-usd.svg';
import currencyBTC from './assets/currency-btc.svg';
import arrow from './assets/arrow-down.svg';
import shape1 from './assets/hero-shape-1.svg';
import shape2 from './assets/hero-shape-2.svg';
import shape3 from './assets/arrow-shape.svg';
import shape4 from './assets/hero-user.svg';

import Swapform from './Swapform';
import Buyform from './Buyform';
import Sellform from './Sellform';
import {useParams} from "react-router-dom";
import Success from './Success';
import PuffLoader from "react-spinners/PuffLoader";


const options = [
    { value: 'usd', label: 'USD', icon:  currencyUSD},
    { value: 'btc', label: 'BTC', icon:  currencyBTC },
    { value: 'eur', label: 'EUR', icon:  currencyUSD },
]; 




const rate_options = [
    { value: 'mtpelerin', label: 'Mt Pelerin',},
    { value: 'Moonpay', label: 'Moon pay',},
    { value: 'mercuryo', label: 'mercuryo',},
];




const svgVariants = {
    hidden: {
         rotate: -180
    },
    visible: {
        rotate: 0,
        transition: {
            duration: 1
        }
    }
}


const IconOption = props => (
    <components.Option {...props}>
        <span className="me-2"><img src={props.data.icon} alt={props.data.label}/></span>
        <span>{props.data.label}</span>
    </components.Option>
);

const ValueContainer = ({children, ...props}) => {
    if (!props.hasValue) {
      return <components.ValueContainer {...props}>{children}</components.ValueContainer>;
    }
  
    const value = props.getValue()[0];
    console.log("CAHNGE", value);

    return (
      <components.ValueContainer {...props}>
        <div className="d-flex gap-2">
            <span><img src={value.icon} alt={value.label}/></span>
            <span>{value.label}</span>
        </div>
      </components.ValueContainer>
    );
  };

const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <img src={arrow} />
      </components.DropdownIndicator>
    );
};

const Hero = () => {


    const data = {
        
        action: [
            { thumb: appStore, },
            { thumb: playStore,}
        ]
    }

    const [selected, setSelected] = useState(false);
    //confirmation
    const [confirmation, setCofirmation] = useState('sample');
    //load success page
    const [loadsuccess, setLoadSuccess] = useState(false);
    //loading
    const [loading, setLoading] = useState(false);
    
    //for selling
    const [callframe, setCallframe] = useState(false)
    const [frameurl, setFrameurl] = useState("");


     useEffect(() => {

     }, [])




/*
    const form = () => {


        const [test, setTest] = useState([
            { value: 'mtpelerin', label: 'Mt Pelerin',},
            { value: 'Moonpay', label: 'Moon pay',},
            { value: 'mercuryo', label: 'mercuryo',},
        ])
        const [selected, setSelected] = useState(false);



        useEffect(() => {

        })


      return (
         <div className="heroform card-body p-4 p-lg-5">
            <form className='mb-5'>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                    <div className='d-flex align-items-center gap-3'>
                        <div><img src={Xicon} alt="X" className='heroform__field-icon'/></div>
                        <div>
                            <h6 className='mb-0 heroform__field-title fs-md-sm fw-regular'>Best rate via</h6>
                            <Select
                                defaultValue={rate_options[0]}
                                styles={{
                                    control: (provided, state) => ({
                                        ...provided,
                                        border: 0,
                                        outline: 0,
                                        boxShadow: 'none',
                                        padding: 0,
                                        fontSize: 'var(--heroform__field-big-fs, 20px)',
                                        fontWeight: 600,
                                        color: '#081537',
                                      }),
                                    valueContainer: (provided, state) => ({
                                        ...provided,
                                        padding: 0,
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        fontSize: '15px',
                                    }),
                                }}
                                options={test}
                                components={{ IndicatorSeparator:() => null,  DropdownIndicator}}
                            />
                        </div>
                    </div>
                    <div>
                        <h6 className='mb-1 heroform__field-title fs-md-sm fw-regular'>1 BTC is ≈</h6>
                        <div className='fs-xs fs-md-sm'><span className="text-dark fw-bold">53,260.20</span> USD</div>
                    </div>
                </div>
                
                <div className="form-group currency-form mb-4">
                    <input type="text" class="input-control" placeholder="4,000" aria-label="Input" value="4,000"/>
                    <span className="vr mx-3 my-1"></span>
                    <Select
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                border: 0,
                                outline: 0,
                                boxShadow: 'none',
                                padding: 0,
                                fontSize: 'var(--heroform__field-big-fs, 18px)',
                                fontWeight: 400,
                                color: '#081537',
                                width: 100,
                                }),
                            valueContainer: (provided, state) => ({
                                ...provided,
                                padding: 0,
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                fontSize: '15px',
                            }),
                        }}
                        defaultValue={options[0]}
                        options={options}
                        components={{ Option: IconOption, IndicatorSeparator:() => null, DropdownIndicator, ValueContainer}}
                    />
                </div>
                
                <div className="form-group currency-form mb-4">
                    <input type="text" class="input-control" placeholder="0.074153" aria-label="Input" value="0.074153"/>
                    <span className="vr mx-3 my-1"></span>
                    <Select
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                border: 0,
                                outline: 0,
                                boxShadow: 'none',
                                padding: 0,
                                fontSize: 'var(--heroform__field-big-fs, 18px)',
                                fontWeight: 400,
                                color: '#081537',
                                width: 100,
                                }),
                            valueContainer: (provided, state) => ({
                                ...provided,
                                padding: 0,
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                fontSize: '15px',
                            }),
                        }}
                        defaultValue={options[2]}
                        options={options}
                        components={{ Option: IconOption, IndicatorSeparator:() => null, DropdownIndicator, ValueContainer}}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary w-100 rounded-pill shadow">Buy BTC</button>
                </div>
            </form>
            <div className='text-center'>
                <h6 className="text-dark fs-sm fw-light">We accept</h6>

                <img src={AccpetPayments} alt="" className='img-fluid'/>


            </div>
        </div>
    )
        }
*/

    
  return (
    <section className='hero-area'>
        <img src={shape1} alt="Shape 1" className='hero-area__shape1' />
        <img src={shape2} alt="Shape 2" className='hero-area__shape2' />
        <Container>
            <Row className='gy-5 align-items-center'>
                <Col lg="7" className='text-center text-lg-start'>
                    <div className="hero-content pe-lg-6 fs-sm-xl col-xl-9">
                        <h1 className='fs-3xl fs-sm-4xl fs-lg-5xl fw-bold ls-xxs lh-sm text-dark mb-4 mb-lg-4'>Better and faster way to on-ramp & <div><span className="gr-text">grow your business</span></div>
                        </h1>
                        <div className="mb-3">
                            <h5 className='fs-lg-md lh-md lh-lg-2xl fw-bold text-dark'>Get crypto in your preferred currency—fast & easy</h5>
                        </div>
                        <div className="mb-3 mb-lg-5">
                            <p className='fs-md-sm lh-lg'>Instant fiat-to-crypto transactions all in one place. Get a customized on-ramp widget for your e-commerce website and scale your business using our solution.</p>
                        </div>
                        <ul className="list-unstyled d-inline-flex flex-wrap gap-3">
                            <button className="btn btn-primary shadow rounded-pill">Start your journey</button>
                            <button className="btn btn-outline-primary shadow rounded-pill">Whitepaper</button>
                        </ul>
                        {/* {data && data.action && <div>
                            <h6 className='mb-3 mb-lg-4 text-dark fs-sm'>Coming Soon</h6>
                            <div className="d-inline-flex flex-wrap gap-3">
                                {data.action.map((item, i) => <a href='#' key={i} className="link-light"><img src={item.thumb} className="img-fluid" alt="Apple "/></a>
                                )}
                            </div>
                        </div>} */}
                    </div>
                </Col>
                <Col lg="5">
                    <motion.div className="hero-formbox"
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.8 }}
                        >
                            <div className="hero-area__shape3 text-center mb-4">
                                <svg className='img-fluid'  width="410" height="410" viewBox="0 0 410 410" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#hero_shape__clip0_8_87)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M212.616 130.613C254.614 119.907 300.582 115.856 341.754 129.301C356.735 134.192 369.739 142.146 383.125 150.169C384.065 150.73 384.372 151.954 383.81 152.898C383.242 153.841 382.019 154.149 381.076 153.582C367.947 145.715 355.21 137.883 340.519 133.087C299.93 119.831 254.608 123.959 213.231 134.562L213.343 135.211C214.576 142.262 210.49 151.069 203.419 159.609C193.284 171.852 177.176 183.691 163.99 189.15C158.065 191.601 152.688 192.753 148.62 192.252C145.449 191.863 142.985 190.507 141.412 188.153C138.061 183.136 139.901 176.482 145.298 169.59C156.581 155.172 183.09 139.123 196.272 135.156C200.389 133.918 204.558 132.732 208.769 131.615C208.586 130.369 208.402 129.15 208.169 127.972C207.496 124.619 206.402 121.56 203.475 118.914C198.909 114.796 192.714 112.72 186.068 111.812C175.695 110.402 164.218 111.87 155.642 113.453C107.877 122.272 78.0926 150.947 58.108 182.234C37.9309 213.835 27.6883 248.113 19.1339 267.7C18.6959 268.708 17.5218 269.163 16.5134 268.725C15.5051 268.287 15.0448 267.112 15.4879 266.105C24.0958 246.391 34.4406 211.901 54.7567 180.092C75.2653 147.97 105.886 118.592 154.916 109.535C163.85 107.885 175.802 106.397 186.603 107.866C194.08 108.887 201.006 111.325 206.144 115.96C210.754 120.122 211.758 125.056 212.616 130.613ZM209.365 135.576L209.424 135.899C210.502 142.062 206.537 149.602 200.352 157.068C190.613 168.833 175.143 180.222 162.465 185.468C158.119 187.269 154.124 188.343 150.837 188.39C148.126 188.425 145.945 187.772 144.726 185.941C143.566 184.216 143.439 182.211 144.009 180.058C144.674 177.529 146.252 174.83 148.43 172.044C159.273 158.191 184.751 142.779 197.419 138.969C201.354 137.788 205.337 136.652 209.365 135.576Z" fill="url(#hero_area__paint0_linear_8_87)"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M386.518 157.379C386.559 156.508 386.257 155.324 385.918 154.055C385.113 151.031 383.727 147.676 383.138 146.068C382.761 145.033 383.297 143.893 384.327 143.515C385.363 143.138 386.505 143.669 386.881 144.704C387.601 146.675 389.44 151.149 390.151 154.652C390.531 156.532 390.557 158.187 390.185 159.276C389.554 161.133 387.757 161.94 384.802 161.119C381.307 160.146 375.222 156.736 369.219 157.476C368.131 157.613 367.134 156.832 367.002 155.744C366.867 154.651 367.642 153.657 368.735 153.522C374.458 152.819 380.291 155.323 384.279 156.76C385.038 157.033 385.965 157.256 386.518 157.379Z" fill="url(#hero-area__paint1_linear_8_87)"/>
                                    </g>
                                    <defs>
                                    <linearGradient id="hero_area__paint0_linear_8_87" x1="45.9006" y1="259.387" x2="312.182" y2="134.377" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#D42FFD"/>
                                    <stop offset="0.329059" stop-color="#3EFBEF"/>
                                    <stop offset="0.637759" stop-color="#1B4CF9"/>
                                    <stop offset="1" stop-color="#53FC18"/>
                                    </linearGradient>
                                    <linearGradient id="hero-area__paint1_linear_8_87" x1="368.814" y1="156.132" x2="389.43" y2="148.149" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#D42FFD"/>
                                    <stop offset="0.329059" stop-color="#3EFBEF"/>
                                    <stop offset="0.637759" stop-color="#1B4CF9"/>
                                    <stop offset="1" stop-color="#53FC18"/>
                                    </linearGradient>
                                    <clipPath id="hero_shape__clip0_8_87">
                                    <motion.rect width="337.664" height="337.664" fill="white" transform="matrix(0.969653 0.244486 0.244486 -0.969653 0 327.417)"
                                        variants={{
                                            offscreen: {
                                                width: 0
                                            },
                                            onscreen: {
                                                width: 337.664,
                                                transition: {
                                                    delay: 1,
                                                    ease: "easeInOut",
                                                    duration: 0.8
                                                }
                                            }
                                        }}
                                    />
                                    </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        <motion.div className='hero-formbox-layer'
                            variants={{
                                offscreen: {
                                    x: 120,
                                    y: -40,
                                    rotate: 7,
                                },
                                onscreen: {
                                    x: 0,
                                    y: 0,
                                    rotate: 0,
                                    transition: {
                                        delay: 2,
                                        type: "spring",
                                        bounce: 0.4,
                                        duration: 0.8
                                    }
                                }
                            }}
                        >
                            <svg width="370" height="526" viewBox="0 0 370 526" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="369.824" y="487.965" width="313.376" height="491.482" rx="18" transform="rotate(173.142 369.824 487.965)" fill="url(#paint0_linear_19_4890)" fill-opacity="0.6"/>
                                <mask id="mask0_19_4890" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="2" y="2" width="366" height="522">
                                <rect x="369.824" y="487.965" width="313.376" height="491.482" rx="18" transform="rotate(173.142 369.824 487.965)" fill="url(#paint1_linear_19_4890)"/>
                                </mask>
                                <g mask="url(#mask0_19_4890)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M100.056 409.092C94.1103 407.673 89.5397 406.312 89.8992 406.068C90.258 405.823 94.1194 404.487 98.4797 403.099C102.84 401.71 106.932 400.153 107.572 399.64C108.691 398.744 108.7 398.402 107.785 391.029L106.832 383.351L105.944 386.864C105.456 388.796 104.928 390.816 104.77 391.353C104.602 391.924 103.092 392.884 101.136 393.665C99.2954 394.399 93.4025 396.757 88.0406 398.904L78.2917 402.807L78.6293 406.973L78.9668 411.139L94.3968 415.351C102.883 417.668 110.287 419.673 110.85 419.806C111.766 420.025 111.82 419.615 111.368 415.862L110.865 411.672L100.056 409.092ZM110.411 423.238C109.389 423.183 103.035 422.917 96.2894 422.648C89.5441 422.378 83.1901 422.115 82.1689 422.064L80.3126 421.97L80.7856 425.902C81.2208 429.52 81.3614 429.845 82.5524 429.972C84.1966 430.148 112.01 431.266 112.694 431.183C112.975 431.15 112.993 429.371 112.736 427.23L112.268 423.339L110.411 423.238ZM113.635 441.643C111.455 437.266 106.376 434.776 102.268 436.07C99.9933 436.787 97.4071 440.167 95.8382 444.473C94.3334 448.605 92.2133 449.574 90.4276 446.947C89.0088 444.859 88.6798 441.487 89.5531 437.972L90.2748 435.066L87.6376 435.026C86.1874 435.005 84.578 434.924 84.0618 434.847C82.7846 434.659 82.3126 438.598 82.9634 444.009C83.7815 450.811 86.3386 454.594 91.1042 456.051C96.491 457.698 99.8316 455.407 102.874 447.976C104.572 443.83 106.042 442.969 107.821 445.082C108.933 446.404 109.398 450.415 108.806 453.595C108.554 454.946 108.877 455.08 112.848 455.268C114.787 455.361 115.03 455.223 115.373 453.842C115.922 451.634 114.844 444.071 113.635 441.643ZM117.294 468.299C117.08 467.655 116.431 466.799 115.854 466.396C115.078 465.856 93.674 459.519 85.2769 457.345C84.7303 457.203 84.6731 458.224 85.0509 461.366L85.5573 465.575L88.0308 466.081L90.5042 466.586L91.2801 471.682L92.0558 476.778L90.5381 477.313C86.9732 478.57 87.096 478.369 87.5568 482.2L87.9881 485.786L89.7632 485.205C90.7398 484.885 97.554 482.603 104.907 480.133L118.275 475.643L117.98 472.557C117.818 470.859 117.51 468.943 117.294 468.299ZM103.071 473.133L98.0217 474.81L97.6195 471.465C97.2631 468.502 97.3344 468.151 98.2438 468.396C98.8081 468.548 101.484 469.197 104.189 469.839C106.894 470.481 108.885 471.107 108.614 471.231C108.343 471.355 105.848 472.211 103.071 473.133Z" fill="white"/>
                                <g opacity="0.6">
                                <rect x="168.489" y="126.153" width="57.4899" height="75.5259" rx="5" transform="rotate(173.142 168.489 126.153)" fill="url(#paint2_linear_19_4890)" stroke="#2F333C"/>
                                <rect x="155.902" y="97.0118" width="39.4538" height="15.7815" rx="5" transform="rotate(173.142 155.902 97.0118)" stroke="#2F333C"/>
                                <path d="M147.949 52.399L151.715 83.7063" stroke="#2F333C"/>
                                <path d="M153.206 96.1072L156.972 127.414" stroke="#2F333C"/>
                                <path d="M131.139 54.4209L134.696 84.0012" stroke="#2F333C"/>
                                <path d="M136.598 99.8102L140.155 129.39" stroke="#2F333C"/>
                                <path d="M114.328 56.4428L118.093 87.7501" stroke="#2F333C"/>
                                <path d="M119.585 100.151L123.35 131.458" stroke="#2F333C"/>
                                </g>
                                <g filter="url(#filter0_i_19_4890)">
                                <path d="M184.193 49.9595L192.146 49.003L191.894 46.9127L193.204 46.7552L194.336 50.8412L184.442 52.0312L184.193 49.9595Z" fill="white"/>
                                <path d="M193.37 59.6562C194.107 59.5675 194.63 59.6586 194.939 59.9293C195.248 60.2 195.456 60.7782 195.563 61.6638L196.169 66.7083C196.276 67.594 196.211 68.205 195.975 68.5412C195.74 68.8837 195.254 69.0992 194.517 69.1878L193.885 69.2638C193.408 69.3212 193.034 69.2908 192.762 69.1727C192.491 69.0608 192.148 68.747 191.735 68.2313L187.538 62.8834L188.224 68.5875L189.674 68.4132L189.381 70.2862L188.6 70.3801C187.863 70.4688 187.34 70.3746 187.03 70.0977C186.721 69.827 186.513 69.2489 186.407 68.3632L185.413 60.1043L186.305 59.997C186.739 59.9449 187.084 59.9944 187.341 60.1457C187.599 60.3032 187.901 60.5967 188.248 61.0262L193.245 67.3145L194.527 67.1603L193.855 61.5677L191.83 61.8112L192.098 59.8093L193.37 59.6562Z" fill="white"/>
                                <path d="M187.445 76.9937C187.338 76.1081 187.403 75.494 187.638 75.1516C187.874 74.8153 188.36 74.6029 189.097 74.5142L189.896 74.4181L190.557 76.3838L189.182 76.5492L189.819 81.8445C189.864 82.2223 189.953 82.4661 190.086 82.5758C190.219 82.6917 190.462 82.7284 190.815 82.686L191.531 82.5999C191.89 82.5567 192.121 82.463 192.223 82.3188C192.331 82.1738 192.363 81.9156 192.318 81.544L191.919 78.2274L193.517 78.0352L193.872 80.9895C193.917 81.3611 194.006 81.6017 194.138 81.7114C194.271 81.8212 194.517 81.8544 194.876 81.8112L195.368 81.752C195.734 81.708 195.968 81.617 196.071 81.479C196.173 81.341 196.202 81.0862 196.158 80.7146L195.574 75.8651L194.348 76.0126L194.477 74.0274L195.09 73.9537C195.827 73.865 196.35 73.9561 196.659 74.2268C196.968 74.4975 197.176 75.0756 197.282 75.9613L197.921 81.2753C198.028 82.1609 197.963 82.7719 197.727 83.1081C197.491 83.4444 197.005 83.6568 196.268 83.7455L195.376 83.8527C194.8 83.922 194.356 83.8341 194.044 83.5889C193.731 83.3437 193.477 82.8748 193.281 82.1821C193.301 82.9776 193.172 83.5775 192.894 83.9816C192.616 84.3858 192.17 84.6247 191.557 84.6985L190.526 84.8225C189.721 84.9193 189.145 84.8126 188.8 84.5022C188.461 84.1912 188.238 83.5897 188.131 82.6978L187.445 76.9937Z" fill="white"/>
                                <path d="M189.662 96.3677L191.938 96.094L191.043 88.6526L192.687 88.4548L199.694 95.0762L199.954 97.2316L193.832 97.9679L194.118 100.346L192.473 100.544L192.187 98.1657L189.911 98.4394L189.662 96.3677ZM193.582 95.8962L197.977 95.3677L192.937 90.5265L193.582 95.8962Z" fill="white"/>
                                <path d="M196.023 111.408L201.534 111.31L202.554 119.792L200.862 119.826L200.037 112.97L198.106 112.976C198.294 113.808 198.445 114.541 198.559 115.174C198.673 115.814 198.762 116.397 198.826 116.923C199.021 118.546 198.888 119.796 198.429 120.675C197.975 121.552 197.194 122.058 196.085 122.191C194.933 122.33 194.046 122.003 193.423 121.211C192.8 120.425 192.375 119.081 192.146 117.18C192.026 116.183 191.952 115.277 191.923 114.464C191.895 113.657 191.913 112.967 191.976 112.394L193.812 111.674C193.754 112.654 193.733 113.574 193.748 114.433C193.77 115.298 193.829 116.123 193.923 116.91C194.071 118.142 194.297 118.995 194.598 119.467C194.906 119.939 195.349 120.14 195.925 120.071C196.47 120.006 196.83 119.714 197.007 119.196C197.183 118.679 197.202 117.838 197.061 116.673C196.972 115.93 196.84 115.117 196.664 114.233C196.489 113.35 196.275 112.408 196.023 111.408Z" fill="white"/>
                                <path d="M198.062 127.891C197.98 127.888 197.898 127.889 197.817 127.892C197.736 127.896 197.627 127.905 197.491 127.922C196.543 128.036 195.97 128.23 195.77 128.506C195.578 128.786 195.533 129.354 195.636 130.209L195.966 132.949C196.047 133.625 196.186 134.079 196.384 134.313C196.582 134.553 196.908 134.646 197.36 134.591L197.899 134.526C198.357 134.471 198.649 134.289 198.775 133.978C198.908 133.673 198.923 133.087 198.818 132.22C198.734 131.52 198.626 130.807 198.495 130.082C198.371 129.362 198.226 128.631 198.062 127.891ZM199.564 127.842C199.766 128.578 199.937 129.302 200.08 130.014C200.229 130.731 200.345 131.439 200.43 132.139C200.62 133.725 200.565 134.834 200.264 135.467C199.97 136.099 199.345 136.473 198.392 136.588L197.063 136.747C196.246 136.846 195.609 136.646 195.153 136.148C194.698 135.65 194.4 134.825 194.262 133.673L193.762 129.52C193.613 128.281 193.728 127.407 194.107 126.896C194.485 126.386 195.25 126.061 196.402 125.923L197.693 125.768C199.521 125.548 201.009 126.01 202.158 127.153C203.314 128.302 204.03 130.029 204.307 132.333C204.318 132.419 204.326 132.513 204.332 132.612C204.344 132.718 204.352 132.858 204.354 133.034L202.938 134.58L202.862 133.948C202.611 131.861 202.237 130.376 201.742 129.493C201.252 128.61 200.526 128.059 199.564 127.842Z" fill="white"/>
                                <path d="M195.358 144.2L204.31 148.495L203.529 142.002L201.411 142.256L201.524 140.141L204.952 139.729L206.264 150.635L204.684 150.825L195.659 146.699L195.358 144.2Z" fill="white"/>
                                <path d="M207.731 162.833C207.837 163.719 207.773 164.33 207.537 164.666C207.301 165.009 206.815 165.224 206.078 165.313L205.186 165.42C204.617 165.489 204.172 165.401 203.854 165.156C203.536 164.912 203.269 164.447 203.055 163.763C203.062 164.497 202.928 165.054 202.653 165.433C202.378 165.811 201.943 166.036 201.348 166.108L200.317 166.232C199.518 166.328 198.946 166.218 198.6 165.901C198.255 165.591 198.028 164.987 197.92 164.089L197.166 157.818C197.059 156.926 197.133 156.289 197.388 155.906C197.65 155.523 198.184 155.283 198.989 155.186L200.02 155.062C200.608 154.991 201.081 155.107 201.438 155.41C201.801 155.712 202.065 156.214 202.232 156.916C202.284 156.206 202.436 155.692 202.687 155.373C202.938 155.06 203.346 154.869 203.909 154.801L204.801 154.694C205.538 154.605 206.061 154.696 206.37 154.967C206.68 155.244 206.888 155.825 206.994 156.711L207.731 162.833ZM205.967 162.273L205.416 157.693C205.371 157.315 205.278 157.068 205.139 156.953C205.005 156.837 204.759 156.801 204.4 156.844L203.908 156.903C203.554 156.946 203.324 157.039 203.216 157.184C203.114 157.329 203.085 157.59 203.131 157.967L203.682 162.547C203.726 162.919 203.815 163.16 203.948 163.269C204.081 163.385 204.327 163.422 204.686 163.378L205.179 163.319C205.544 163.275 205.778 163.181 205.88 163.037C205.983 162.899 206.012 162.644 205.967 162.273ZM202.109 162.953L201.505 157.927C201.46 157.556 201.372 157.315 201.239 157.205C201.106 157.096 200.857 157.063 200.492 157.107L199.777 157.193C199.417 157.236 199.186 157.323 199.083 157.455C198.985 157.586 198.96 157.844 199.006 158.228L199.61 163.254C199.656 163.632 199.741 163.873 199.867 163.977C200 164.087 200.245 164.12 200.605 164.077L201.32 163.991C201.685 163.947 201.92 163.856 202.022 163.718C202.125 163.58 202.154 163.325 202.109 162.953Z" fill="white"/>
                                <path d="M204.485 185.758C204.288 185.065 204.119 184.36 203.976 183.642C203.839 182.923 203.726 182.195 203.638 181.458C203.447 179.873 203.499 178.761 203.792 178.122C204.093 177.489 204.718 177.116 205.665 177.002L206.984 176.843C207.802 176.745 208.438 176.941 208.893 177.433C209.349 177.931 209.646 178.756 209.785 179.908L210.283 184.052C210.432 185.291 210.317 186.165 209.939 186.676C209.56 187.186 208.795 187.511 207.643 187.649L206.352 187.804C204.525 188.024 203.037 187.562 201.888 186.419C200.738 185.275 200.025 183.551 199.748 181.248C199.725 181.055 199.711 180.91 199.705 180.81C199.694 180.717 199.689 180.626 199.691 180.538L201.099 179.002L201.174 179.625C201.426 181.718 201.8 183.206 202.295 184.089C202.792 184.978 203.522 185.534 204.485 185.758ZM206.003 185.688C206.117 185.693 206.224 185.693 206.323 185.687C206.43 185.687 206.521 185.682 206.595 185.673C207.561 185.557 208.147 185.358 208.352 185.076C208.556 184.794 208.607 184.222 208.503 183.361L208.176 180.639C208.093 179.952 207.95 179.488 207.745 179.249C207.54 179.01 207.203 178.918 206.732 178.975L206.184 179.041C205.707 179.098 205.402 179.283 205.27 179.594C205.138 179.905 205.125 180.5 205.23 181.38C205.305 181.999 205.405 182.672 205.53 183.398C205.662 184.13 205.82 184.893 206.003 185.688Z" fill="white"/>
                                <path d="M203.314 194.051L204.158 201.065L210.54 200.297L209.697 193.283L203.314 194.051ZM208.799 191.308C209.698 191.2 210.326 191.282 210.686 191.552C211.052 191.829 211.287 192.401 211.391 193.268L212.19 199.91C212.295 200.783 212.202 201.395 211.911 201.744C211.627 202.098 211.036 202.33 210.138 202.438L204.964 203.06C204.065 203.168 203.433 203.084 203.067 202.807C202.708 202.536 202.476 201.964 202.371 201.091L201.572 194.449C201.467 193.582 201.557 192.971 201.841 192.616C202.132 192.267 202.727 192.038 203.625 191.93L208.799 191.308Z" fill="white"/>
                                <path d="M203.667 211.868L211.619 210.911L211.368 208.821L212.678 208.663L213.81 212.749L203.916 213.939L203.667 211.868Z" fill="white"/>
                                <path d="M212.844 221.564C213.581 221.476 214.104 221.567 214.413 221.837C214.722 222.108 214.93 222.686 215.036 223.572L215.643 228.617C215.749 229.502 215.685 230.113 215.449 230.449C215.213 230.792 214.727 231.007 213.99 231.096L213.359 231.172C212.882 231.229 212.507 231.199 212.235 231.081C211.964 230.969 211.622 230.655 211.208 230.14L207.012 224.792L207.698 230.496L209.147 230.321L208.854 232.194L208.074 232.288C207.337 232.377 206.813 232.283 206.504 232.006C206.195 231.735 205.987 231.157 205.88 230.271L204.887 222.012L205.779 221.905C206.212 221.853 206.558 221.903 206.814 222.054C207.072 222.211 207.374 222.505 207.721 222.934L212.719 229.223L214.001 229.069L213.328 223.476L211.303 223.719L211.571 221.717L212.844 221.564Z" fill="white"/>
                                <path d="M207.805 246.278C207.699 245.393 207.763 244.779 207.999 244.436C208.235 244.1 208.721 243.887 209.458 243.799L210.257 243.703L210.918 245.668L209.543 245.834L210.18 251.129C210.225 251.507 210.314 251.751 210.447 251.86C210.58 251.976 210.823 252.013 211.176 251.971L211.891 251.884C212.251 251.841 212.481 251.748 212.583 251.603C212.691 251.458 212.723 251.2 212.679 250.829L212.28 247.512L213.878 247.32L214.233 250.274C214.278 250.646 214.366 250.886 214.499 250.996C214.631 251.106 214.877 251.139 215.236 251.096L215.729 251.037C216.094 250.993 216.328 250.902 216.431 250.764C216.534 250.626 216.563 250.371 216.518 249.999L215.935 245.15L214.709 245.297L214.837 243.312L215.451 243.238C216.188 243.15 216.711 243.241 217.02 243.511C217.329 243.782 217.536 244.36 217.643 245.246L218.282 250.56C218.389 251.445 218.324 252.056 218.088 252.393C217.852 252.729 217.365 252.941 216.628 253.03L215.736 253.137C215.16 253.207 214.716 253.119 214.404 252.873C214.092 252.628 213.838 252.159 213.641 251.467C213.662 252.262 213.533 252.862 213.254 253.266C212.976 253.67 212.531 253.909 211.918 253.983L210.886 254.107C210.081 254.204 209.506 254.097 209.161 253.787C208.822 253.476 208.599 252.874 208.491 251.982L207.805 246.278Z" fill="white"/>
                                <path d="M210.023 265.652L212.299 265.379L211.404 257.937L213.048 257.739L220.055 264.361L220.314 266.516L214.192 267.252L214.478 269.631L212.834 269.828L212.548 267.45L210.272 267.724L210.023 265.652ZM213.943 265.181L218.337 264.652L213.297 259.811L213.943 265.181Z" fill="white"/>
                                <path d="M215.496 273.316L221.007 273.218L222.028 281.7L220.335 281.734L219.511 274.878L217.579 274.884C217.767 275.716 217.918 276.449 218.032 277.082C218.147 277.722 218.236 278.305 218.299 278.831C218.494 280.454 218.362 281.705 217.902 282.583C217.448 283.461 216.667 283.966 215.559 284.099C214.407 284.238 213.519 283.911 212.896 283.119C212.274 282.333 211.848 280.989 211.62 279.088C211.5 278.091 211.425 277.186 211.397 276.372C211.369 275.565 211.386 274.875 211.449 274.302L213.285 273.582C213.227 274.563 213.206 275.482 213.221 276.341C213.244 277.206 213.302 278.031 213.397 278.818C213.545 280.05 213.77 280.903 214.072 281.375C214.38 281.847 214.822 282.049 215.398 281.979C215.943 281.914 216.304 281.622 216.48 281.105C216.657 280.587 216.675 279.746 216.535 278.582C216.446 277.838 216.313 277.025 216.138 276.141C215.962 275.258 215.749 274.316 215.496 273.316Z" fill="white"/>
                                <path d="M217.535 289.799C217.453 289.796 217.372 289.797 217.29 289.8C217.209 289.804 217.1 289.814 216.964 289.83C216.017 289.944 215.443 290.139 215.244 290.414C215.051 290.695 215.007 291.262 215.109 292.117L215.439 294.858C215.52 295.533 215.66 295.987 215.857 296.221C216.056 296.461 216.381 296.554 216.833 296.499L217.372 296.435C217.83 296.38 218.123 296.197 218.249 295.886C218.382 295.581 218.396 294.995 218.292 294.128C218.207 293.428 218.1 292.716 217.969 291.99C217.844 291.27 217.7 290.539 217.535 289.799ZM219.037 289.75C219.239 290.486 219.411 291.21 219.553 291.922C219.702 292.639 219.819 293.348 219.903 294.047C220.094 295.633 220.039 296.742 219.738 297.375C219.443 298.008 218.819 298.381 217.865 298.496L216.537 298.656C215.719 298.754 215.082 298.554 214.627 298.056C214.171 297.558 213.874 296.733 213.735 295.581L213.236 291.428C213.087 290.19 213.202 289.315 213.58 288.805C213.958 288.294 214.724 287.97 215.876 287.831L217.167 287.676C218.994 287.456 220.482 287.918 221.631 289.061C222.787 290.21 223.504 291.937 223.781 294.241C223.791 294.327 223.799 294.421 223.805 294.521C223.818 294.626 223.825 294.766 223.827 294.942L222.411 296.488L222.335 295.857C222.084 293.769 221.711 292.284 221.215 291.402C220.726 290.518 220 289.968 219.037 289.75Z" fill="white"/>
                                </g>
                                </g>
                                <defs>
                                <filter id="filter0_i_19_4890" x="184.193" y="46.7552" width="41.6342" height="252.925" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dx="2" dy="1"/>
                                <feGaussianBlur stdDeviation="1"/>
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_19_4890"/>
                                </filter>
                                <linearGradient id="paint0_linear_19_4890" x1="526.512" y1="487.965" x2="525.482" y2="976.01" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#083EFD"/>
                                <stop offset="1" stop-opacity="0"/>
                                </linearGradient>
                                <linearGradient id="paint1_linear_19_4890" x1="526.512" y1="487.965" x2="526.512" y2="979.447" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#E42C64"/>
                                <stop offset="1" stop-color="#614AD3"/>
                                </linearGradient>
                                <linearGradient id="paint2_linear_19_4890" x1="197.234" y1="126.153" x2="197.234" y2="201.679" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#F9AA4B"/>
                                <stop offset="1" stop-color="#E8B579"/>
                                </linearGradient>
                                </defs>
                            </svg>
                        </motion.div>

                        <div className="card rounded-4 shadow overflow-hidden mainside">

                            { loading &&
                             <div className="loader"> 
                                <PuffLoader color={"#1554F0"} loading={loading}  size={100} />
                             </div>
                            }
    

                        { loadsuccess ? 

                            <Success setLoadSuccess={setLoadSuccess} />

                            :
                           
                           <>
                            { callframe ?

                             <iframe src={`${frameurl}/embed`} frameborder="0" style={{ position: 'relative', maxWidth:640, width:'100%', height:'100%', overflowX:'none', overflowY: 'none' }} />
                            :

                            <Tabs
                                defaultActiveKey="buy"
                                id="uncontrolled-tab-example"
                                className="nav-tabs"
                                fill
                                >
                                    
                                <Tab eventKey="buy" title="BUY">

                                  { selected ?

                                    <iframe 
                                       style={{maxWidth:640, width:'600px', height:'650px', overflowX:'none', overflowY: 'none' }} 
                                       src="https://widget.mtpelerin.com/?lang=en" />
                                   :

                                   <>
                                     {<Buyform 
                                        setSelected={setSelected} 
                                        selected={selected} 
                                        setCofirmation={setCofirmation} 
                                        setLoadSuccess={setLoadSuccess}
                                        setLoading={setLoading}
                                        loading={loading}
                                        /> }
                                   </>

                                  } 
                                  
                                </Tab>
                                <Tab eventKey="sell" title="SELL">
                                  <Sellform
                                    setLoading={setLoading}
                                    loading={loading}
                                    setFrameurl={setFrameurl}
                                    setCallframe={setCallframe}
                                  />
                                </Tab>
                                <Tab eventKey="swap" title="SWAP">
                                    { <Swapform /> }
                                </Tab>
                            </Tabs>
                        
                            }
                           </>
                          }

                        </div>
                        <img src={shape4} alt="Arrowshape" className='hero-area__shape4' />
                    </motion.div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Hero;