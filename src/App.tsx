import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { SongsProvider } from './contexts/SongsContext';

import Container from './container/container';
import 'swiper/css/swiper.min.css';
import './App.css';

function App() {
  return (
    <>
      <SongsProvider>
        <BrowserRouter>
          <Container />
        </BrowserRouter>
      </SongsProvider>
    </>
  );
}

export default App;
