import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Task Management App</h1>
            <Link to="/comments">Go to Comment Section</Link>
        </div>
    );
};

export default Home;
