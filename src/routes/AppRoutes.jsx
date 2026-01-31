import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public Pages
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Services from '../pages/public/Services';
import ServiceDetail from '../pages/public/ServiceDetail';
import Projects from '../pages/public/Projects';
import ProjectDetail from '../pages/public/ProjectDetail';
import Contact from '../pages/public/Contact';
import Pricing from '../pages/public/Pricing';
import Blog from '../pages/public/Blog';
import BlogDetail from '../pages/public/BlogDetail';
import CreateAdmin from '../pages/CreateAdmin';
// Admin Pages
import Login from '../pages/admin/Login';
import Dashboard from '../pages/admin/Dashboard';
import ManageProjects from '../pages/admin/ManageProjects';
import ManageServices from '../pages/admin/ManageServices';
import ManageBlogs from '../pages/admin/ManageBlogs';
import ManageMessages from '../pages/admin/ManageMessages';
import SiteSettings from '../pages/admin/SiteSettings';
import ManagePricing from '../pages/admin/ManagePricing';
import ManageTechnologies from '../pages/admin/ManageTechnologies';
import ManageTestimonials from '../pages/admin/ManageTestimonials';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return isAuthenticated() ? children : <Navigate to="/admin/login" replace />;
};

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PublicLayout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="services" element={<Services />} />
                    <Route path="services/:id" element={<ServiceDetail />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="projects/:id" element={<ProjectDetail />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="pricing" element={<Pricing />} />
                    <Route path="blog" element={<Blog />} />
                    <Route path="blog/:slug" element={<BlogDetail />} />
                    <Route path="create-admin" element={<CreateAdmin />} />
                </Route>

                {/* Admin Login (not protected) */}
                <Route path="/admin/login" element={<Login />} />

                {/* Protected Admin Routes */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="projects" element={<ManageProjects />} />
                    <Route path="services" element={<ManageServices />} />
                    <Route path="blogs" element={<ManageBlogs />} />
                    <Route path="messages" element={<ManageMessages />} />
                    <Route path="settings" element={<SiteSettings />} />
                    <Route path="pricing" element={<ManagePricing />} />
                    <Route path="technologies" element={<ManageTechnologies />} />
                    <Route path="testimonials" element={<ManageTestimonials />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={<div className="min-h-screen flex items-center justify-center"><h1>404 - Page Not Found</h1></div>} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
