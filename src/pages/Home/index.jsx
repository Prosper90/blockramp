import React from 'react'
import PrimaryLayout from '../../layouts/PrimaryLayout';
import Hero from '../../sections/Hero';
import GrowUsers from '../../sections/GrowUsers';
import Partners from '../../sections/Partners';
import FeesPricing from '../../sections/FeesPricing';
import Exprerience from '../../sections/Experience';
import Payments from '../../sections/Payments';
import Flokramper from '../../sections/Flokramper';
import Fiat from '../../sections/Fiat';

const Home = () => {
  return (
    <PrimaryLayout>
      <Hero />
      <Partners />
      <Fiat />
      <Payments />
      <GrowUsers />
      <FeesPricing />
      <Flokramper />
      <Exprerience />
    </PrimaryLayout>
  )
}

export default Home