import { useState, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router'
import { Menu, CircleQuestionMark } from 'lucide-react'
import './index.css'
import ErrorBoundary from './ErrorBoundary.jsx'
import App from './App.jsx'
import Release from './Release.jsx'
import Details from './Details.jsx'
import Watch from './Watch.jsx'
import About from './About.jsx'
import NotFound from './NotFound.jsx'

const getYear = new Date().getFullYear();

const Header = () => {
    return (
        <header className="flex justify-between items-center bg-blue-700 p-3 px-3.5 z-40 text-white">
            <h1 className="text-2xl font-bold">
                <Link to="/">Ainara</Link>
            </h1>
        </header>
    )
}

const Footer = () => {
    return (
        <footer className="flex flex-col gap-y-5 bg-gradient-to-b from-indigo-400 to-blue-700 text-white p-5 pt-24">
            <div className="-space-y-1">
                <h2 className="text-4xl font-bold">Ainara</h2>
                <p className="text-sm">Initial Release {getYear}</p>
            </div>
            
            <table>
                <tbody>
                    <tr>
                        <Link to="https://github.com/Alreynn">Kunjungi Github</Link>
                    </tr>
                    <tr>
                        <Link to="https://www.sankavollerei.com/anime/">Sumber API</Link>
                    </tr>
                </tbody>
            </table>
        </footer>
    )
}

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
