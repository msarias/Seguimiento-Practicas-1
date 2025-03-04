// App.js
import React from 'react';
import MainContent from '../src/components/MainContent';
import './App.css';
import LoginHeader from './components/LoginHeader.jsx';

const App = () => {
  return (
    <div className="App">

      <LoginHeader />

      <MainContent />

    </div>
  );
};

export default App;
