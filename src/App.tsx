import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Media from './pages/Media';
import Masterclass from './pages/Masterclass';
import Projects from './pages/Projects';
import Events from './pages/Events';
import Profile from './pages/Profile';
import CreatorMembership from './pages/CreatorMembership';
import MemberMembership from './pages/MemberMembership';
import Content from './pages/Content';
import Account from './pages/Account';
import Connect from './pages/Connect';
import CareerGuidance from './pages/CareerGuidance';
import CourseDetail from './pages/CourseDetail';
import CourseLearn from './pages/CourseLearn';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import './App.css';

// A component to render the main layout and routes
function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/signin" element={user ? <Navigate to="/dashboard" /> : <SignIn />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignUp />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
        <Route path="/media" element={<Media />} />
        <Route path="/masterclass" element={<Masterclass />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/learn/:id" element={<ProtectedRoute><CourseLearn /></ProtectedRoute>} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/events" element={<Events />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/creator-membership" element={<ProtectedRoute><CreatorMembership /></ProtectedRoute>} />
        <Route path="/member-membership" element={<ProtectedRoute><MemberMembership /></ProtectedRoute>} />
        <Route path="/content" element={<ProtectedRoute><Content /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/connect" element={<ProtectedRoute><Connect /></ProtectedRoute>} />
        <Route path="/career-guidance/:masterclassId" element={<ProtectedRoute><CareerGuidance /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

// A component to protect routes that require authentication
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  // We can add a loading check here if needed, but AppRoutes already has one.
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

// The main App component that sets up providers and routing
function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;