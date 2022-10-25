import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { StickyContainer } from 'react-sticky';

const PrimaryLayout = ({children}) => {
  return (
    <StickyContainer>
    <main className='overflow-hidden'>
        <Header />
        <div className="main-container">
            {children}
        </div>
        <Footer />
    </main>
    </StickyContainer>
  )
}

export default PrimaryLayout