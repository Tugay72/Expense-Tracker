import './App.css';
import { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Homepage = lazy(() => import('./pages/homepage/homepage'));

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={<Homepage />}

                />
                <Route
                    path='/homepage'
                    element={<Homepage />}
                />

            </Routes>
        </Router>
    );
}

export default App;
