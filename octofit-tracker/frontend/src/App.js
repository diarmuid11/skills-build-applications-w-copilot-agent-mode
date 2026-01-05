import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            🏋️ OctoFit Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/')}`} to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/users')}`} to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/teams')}`} to="/teams">
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/activities')}`} to="/activities">
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/workouts')}`} to="/workouts">
                  Workouts
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/leaderboard')}`} to="/leaderboard">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="content-container">
        <Routes>
          <Route
            path="/"
            element={
              <div className="container content-wrapper">
                <div className="jumbotron">
                  <h1>Welcome to OctoFit Tracker 🚀</h1>
                  <p className="lead">
                    Your ultimate fitness companion for tracking activities, managing teams, and competing with others!
                  </p>
                  <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
                  <p className="mb-4">
                    Explore the app using the navigation menu above to get started with your fitness journey.
                  </p>
                  <div className="d-flex gap-2 justify-content-center flex-wrap">
                    <Link to="/users" className="btn btn-light btn-lg">
                      👤 View Users
                    </Link>
                    <Link to="/teams" className="btn btn-light btn-lg">
                      👥 Join Teams
                    </Link>
                    <Link to="/workouts" className="btn btn-light btn-lg">
                      🏋️ Start Workout
                    </Link>
                    <Link to="/leaderboard" className="btn btn-light btn-lg">
                      🏆 View Leaderboard
                    </Link>
                  </div>
                </div>

                <div className="row mt-5 mb-5">
                  <div className="col-md-3 mb-4">
                    <div className="card text-center h-100">
                      <div className="card-body">
                        <h5 className="card-title display-5">💪</h5>
                        <h6 className="card-title">Track Activities</h6>
                        <p className="card-text small">Log and monitor your fitness activities with ease.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-4">
                    <div className="card text-center h-100">
                      <div className="card-body">
                        <h5 className="card-title display-5">👥</h5>
                        <h6 className="card-title">Build Teams</h6>
                        <p className="card-text small">Create and manage teams to collaborate with friends.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-4">
                    <div className="card text-center h-100">
                      <div className="card-body">
                        <h5 className="card-title display-5">🏆</h5>
                        <h6 className="card-title">Compete</h6>
                        <p className="card-text small">Rise up the leaderboard and prove your fitness prowess.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-4">
                    <div className="card text-center h-100">
                      <div className="card-body">
                        <h5 className="card-title display-5">🎯</h5>
                        <h6 className="card-title">Personalized Plans</h6>
                        <p className="card-text small">Get custom workout suggestions tailored to your goals.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>

      <footer className="mt-5">
        <div className="container">
          <p className="mb-0">
            &copy; 2024 OctoFit Tracker. All rights reserved. | 
            <a href="#privacy" className="ms-2" style={{ color: '#ffc107', textDecoration: 'none' }}>Privacy Policy</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
