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
import { Login } from './pages/Login';
import { CourseCatalog } from './pages/CourseCatalog';
import { Broadcast } from './pages/Broadcast';
import { SeerahCourse } from './pages/SeerahCourse';
import { PostsEvents } from './pages/PostsEvents';
import { Members } from './pages/Members';
import { JoinUs } from './pages/JoinUs';
import { Workspace } from './pages/Workspace';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-cream text-emerald-950 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">

          {/* Main Global Navigation */}
          <Navbar />

          {/* Central responsive main content container */}
          <main className="grow w-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/courses" element={<CourseCatalog />} />
              <Route path="/broadcast" element={<Broadcast />} />
              <Route path="/academy" element={<SeerahCourse />} />
              <Route path="/feed" element={<PostsEvents />} />
              <Route path="/team" element={<Members />} />
              <Route path="/join" element={<JoinUs />} />

              {/* Protected role-specific staff workspace */}
              <Route
                path="/workspace"
                element={
                  <ProtectedRoute allowedRoles={['dawah', 'design', 'executive', 'admin']}>
                    <Workspace />
                  </ProtectedRoute>
                }
              />
              {/* Back-compat redirect for the old route */}
              <Route path="/workflow" element={<Navigate to="/workspace" replace />} />

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
