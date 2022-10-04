import React from 'react';
import './App.css';
import Home from './pages/Home';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ApiContextProvider from './context/ApiContext';
import Commits from './pages/Commits';
import MergeRequests from './pages/MergeRequests';
import Issues from './pages/Issues';
import Overview from './pages/Overview';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <HashRouter>
        <ApiContextProvider>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/overview"
              element={
                <Navigation>
                  <Overview />
                </Navigation>
              }
            ></Route>
            <Route
              path="/commits"
              element={
                <Navigation>
                  <Commits />
                </Navigation>
              }
            ></Route>
            <Route
              path="/issues"
              element={
                <Navigation>
                  <Issues />
                </Navigation>
              }
            ></Route>
            <Route
              path="/mergerequests"
              element={
                <Navigation>
                  <MergeRequests />
                </Navigation>
              }
            ></Route>
          </Routes>
        </ApiContextProvider>
      </HashRouter>
      <Footer />
    </>
  );
}

export default App;
