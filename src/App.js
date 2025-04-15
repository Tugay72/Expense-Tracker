import './App.css';
import { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Homepage = lazy(() => import('./pages/homepage/homepage'));
const LoginPage = lazy(() => import('./pages/login/login'));

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={<Homepage />}

                />
                <Route
                    path='/login'
                    element={<LoginPage />}

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
