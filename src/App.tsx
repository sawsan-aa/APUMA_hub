/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { Dashboard } from './pages/Dashboard';
import { SeerahCourse } from './pages/SeerahCourse';
import { PostsEvents } from './pages/PostsEvents';
import { Members } from './pages/Members';
import { JoinUs } from './pages/JoinUs';
import { DesignWorkflow } from './components/DesignWorkflow';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-[#FCFBF7] text-slate-800 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900">
          
          {/* Main Global Navigation */}
          <Navbar />

          {/* Central responsive main content container */}
          <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/academy" element={<SeerahCourse />} />
              <Route path="/feed" element={<PostsEvents />} />
              <Route path="/team" element={<Members />} />
              <Route path="/join" element={<JoinUs />} />

              {/* Protected Internal Role-based Workflow Routes */}
              <Route 
                path="/workflow" 
                element={
                  <ProtectedRoute allowedRoles={['team', 'executive', 'admin']}>
                    <DesignWorkflow />
                  </ProtectedRoute>
                } 
              />

              {/* Safe Wildcard Redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Core Footer Linkage */}
          <Footer />

        </div>
      </Router>
    </AppProvider>
  );
}
