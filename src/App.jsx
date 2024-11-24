import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Reports from './pages/Reports';
import RouteOptimization from './pages/RouteOptimization';
import CarbonCalculator from './pages/CarbonCalculator';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRoute />}>
              <Route
                path="/Home"
                element={
                  <>
                    <Navbar />
                    <Home />
                  </>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <>
                    <Navbar />
                    <Dashboard />
                  </>
                }
              />
              <Route
                path="/analytics"
                element={
                  <>
                    <Navbar />
                    <Analytics />
                  </>
                }
              />
              <Route
                path="/route-optimization"
                element={
                  <>
                    <Navbar />
                    <RouteOptimization />
                  </>
                }
              />
              <Route
                path="/carbon-calculator"
                element={
                  <>
                    <Navbar />
                    <CarbonCalculator />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    <Navbar />
                    <Profile />
                  </>
                }
              />
              <Route
                path="/reports"
                element={
                  <>
                    <Navbar />
                    <Reports />
                  </>
                }
              />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;