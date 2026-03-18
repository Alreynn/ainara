import { useState, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router'
import './index.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import App from './App.jsx'
import Release from './Release.jsx'
import Details from './Details.jsx'
import Watch from './Watch.jsx'
import About from './About.jsx'
import NotFound from './NotFound.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Header />
          <ErrorBoundary>
              <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="/release" element={<Release />} />
                  <Route path="/anime/:slug" element={<Details />} />
                  <Route path="/anime/watch/:slug" element={<Watch />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
          </ErrorBoundary>
          <Footer />
      </BrowserRouter>
  </StrictMode>,
)
