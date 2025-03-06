// App.js
import React from 'react';
import MainContent from '../src/components/MainContent';
import Login from './components/Login';
import Header from './components/Header';
import Content from './components/Content';
// import NavBar from './components/NavBar';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <Content />
    </div>
  );
};

export default App;
