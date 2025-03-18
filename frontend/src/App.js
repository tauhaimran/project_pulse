import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CommentPage from './pages/CommentPage';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/comments" element={<CommentPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
