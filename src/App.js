import "./App.css";
import { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Homepage = lazy(() => import("./pages/homepage/homepage.jsx"));
const LoginPage = lazy(() => import("./pages/login/login"));
const Expenses = lazy(() => import("./pages/expenses/expenses"));
const Incomes = lazy(() => import("./pages/incomes/incomes"));
const ReportPage = lazy(() => import("./pages/reportPage/report"));
const Profile = lazy(() => import('./pages/profile/profile.jsx'))
const RegisterPage = lazy(() => import('./pages/register/RegisterPage.jsx'))
const SettingsPage = lazy(() => import('./pages/settings/settings.jsx'))

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={< LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/incomes" element={<Incomes />} />
                <Route path="/reports" element={<ReportPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
