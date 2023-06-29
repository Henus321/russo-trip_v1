import React from 'react';
import Slider from '../../components/slider/Slider';
import Cities from '../../components/cities/Cities';
import Faq from '../../components/faq/Faq';
import How from '../../components/how/How';

import './home.scss';

const Home: React.FC = () => {
  return (
    <main className="home">
      <Slider />
      <Cities />
      <Faq />
      <How />
    </main>
  );
};

export default Home;
