import { useState, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import App from './App.jsx'
import Release from './Release.jsx'
import AllAnime from './AllAnime.jsx'
import Search from './Search.jsx'
import Genre from './Genre.jsx'
import Details from './Details.jsx'
import Watch from './Watch.jsx'
import NotFound from './NotFound.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <HelmetProvider>
            <Header />
              <ErrorBoundary>
                  <Routes>
                      <Route path="/" element={<App />} />
                      <Route path="/release" element={<Release />} />
                      <Route path="/anime" element={<AllAnime />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/genre/:slug" element={<Genre />} />
                      <Route path="/anime/:slug" element={<Details />} />
                      <Route path="/anime/watch/:slug" element={<Watch />} />
                      <Route path="*" element={<NotFound />} />
                  </Routes>
              </ErrorBoundary>
            <Footer />
          </HelmetProvider>
      </BrowserRouter>
  </StrictMode>,
)
