import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import DashboardLayout from './components/Layout/DashboardLayout';
import DashboardHome from './pages/Dashboard/Home';
import Discover from './pages/Dashboard/Discover';
import './App.css'; // Ensure App.css is imported but it's cleared so it's fine. Global styles are in index.css

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="discover" element={<Discover />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
