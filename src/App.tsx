import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ApiContextProvider from './context/ApiContext';
import Commits from './components/Commits';
import MergeRequests from './components/MergeRequests';
import Issues from './components/Issues';
import Overview from './components/Overview';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <BrowserRouter>
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
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
