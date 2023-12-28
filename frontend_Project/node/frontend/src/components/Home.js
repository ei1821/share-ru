// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import Counter from './Counter';
const Home = () => {
    return (
        <div className='container'>
            <h2>Home</h2>
            <p>Welcome to the home page!</p>
            <Counter />
        </div>
    );
};

export default Home;
