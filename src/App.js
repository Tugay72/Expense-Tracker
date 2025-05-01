import "./App.css";
import { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/register/RegisterPage";

const Homepage = lazy(() => import("./pages/homepage/HomePage"));
const LoginPage = lazy(() => import("./pages/login/login"));
const Expenses = lazy(() => import("./pages/expenses/expenses"));
const Incomes = lazy(() => import("./pages/incomes/incomes"));
const ReportPage = lazy(() => import("./pages/reportPage/report"));

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/login" element={< LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/incomes" element={<Incomes />} />
                <Route path="/reports" element={<ReportPage />} />
            </Routes>
        </Router>
    );
}

export default App;
