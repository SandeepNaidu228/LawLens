import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts (from src/components/Layout)
import DashboardLayout from './components/Layout/DashboardLayout';

// Pages (from src/pages)
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';

// Dashboard Pages (from src/pages/Dashboard)
import Home from './pages/Dashboard/Home';
import Discover from './pages/Dashboard/Discover';
import Profile from './pages/Dashboard/Profile'; // <-- Import the new page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="discover" element={<Discover />} />
          <Route path="profile" element={<Profile />} /> {/* <-- Add the route */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;