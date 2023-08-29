import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style.css'


import App from './App';
import  About from "./Components/About";
import Skills from './Components/skills';
import Portfilio from './Components/portofolio';
import Footer from './Components/footer'
// import Header from './Components/Header';
//  import Footer from './Components/footer';
 

 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<div>
    <App/>
    <About/>
    <Skills/>
    < Portfilio />
    <Footer/>
    </div>);
 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 
