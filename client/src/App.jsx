import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import ResumeUploader from './pages/ResumeUploader';
import JobMatches from './pages/JobMatches';
import ATSReport from './pages/ATSReport';
import AICareerCoach from './pages/AICareerCoach';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/resume-upload" element={<ResumeUploader />} />
        <Route path="/job-matches" element={<JobMatches />} />
        <Route path="/ats-report" element={<ATSReport />} />
        <Route path="/ai-coach" element={<AICareerCoach />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
