import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

function App() {
 return (
    <Router>
       <Routes>
            <Route path="/timeblock" element={<Home />} />

            <Route path="/timeblock/dashboard" element={<Dashboard />} />

       </Routes>
    </Router>
 );
}

export default App;