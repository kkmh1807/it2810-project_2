import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ApiContextProvider from './context/ApiContext';
import Commits from './components/Commits';
import MergeRequests from './components/MergeRequests';
import Issues from './components/Issues';
import Overview from './components/Overview';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <ApiContextProvider>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/overview" element={<Overview />}></Route>
            <Route path="/commits" element={<Commits />}></Route>
            <Route path="/issues" element={<Issues />}></Route>
            <Route path="/mergerequests" element={<MergeRequests />}></Route>
          </Routes>
        </ApiContextProvider>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
