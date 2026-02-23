import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import MentorsPage from './pages/MentorsPage';
import PlacementsPage from './pages/PlacementsPage';
import BlogsPage from './pages/BlogsPage';
import AboutPage from './pages/AboutPage';
import CommunityPage from './pages/CommunityPage';
import ScholarshipPage from './pages/ScholarshipPage';
import MasterclassesPage from './pages/MasterclassesPage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#0a0a0f", minHeight: "100vh" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailsPage />} />
          <Route path="/mentors" element={<MentorsPage />} />
          <Route path="/placements" element={<PlacementsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/scholarship" element={<ScholarshipPage />} />
          <Route path="/masterclasses" element={<MasterclassesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
