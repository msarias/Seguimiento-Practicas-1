// App.js
import React from 'react';
import MainContent from '../src/components/MainContent';
import Login from './components/Login';
import Header from './components/Header';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Login />

    </div>
  );
};

export default App;
