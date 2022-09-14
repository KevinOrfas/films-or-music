import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './assets/main.css';
import Albums from './pages/Spotify';
import Product from './pages/Product';
import NotFound from './pages/NotFound';
import { AppLayout } from './components/Layout';
import Films from './pages/Films';

/**
 * The starting page for your App
 */

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/films" element={<Films />} />
              <Route path="/albums" element={<Albums />} />
              <Route path="/albums/:id" element={<Product />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
