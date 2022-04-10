import React from 'react';

import { SongsProvider } from './contexts/SongsContext';

import Container from './container/container';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
import './App.css';

function App() {
  return (
    <SongsProvider>
      <Container />
    </SongsProvider>
  );
}

export default App;
