import React from 'react';

import { SongsProvider } from './contexts/SongsContext';

import Container from './container/container';
import 'swiper/css/swiper.min.css';
import './App.css';

function App() {
  return (
    <>
      <SongsProvider>
          <Container />
      </SongsProvider>
    </>
  );
}

export default App;
