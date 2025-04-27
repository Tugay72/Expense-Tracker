import "./App.css";
import { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Homepage = lazy(() => import("./pages/homepage/HomePage"));
const LoginPage = lazy(() => import("./pages/login/login"));
const Expenses = lazy(() => import("./pages/expenses/expenses"));
const Incomes = lazy(() => import("./pages/incomes/incomes"));


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/incomes" element={<Incomes />} />
            </Routes>
        </Router>
    );
}

export default App;
