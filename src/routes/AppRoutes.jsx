import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuth } from '../context/AuthContext';
import ScrollToTop from '../components/ScrollToTop';
import LoadingFallback from '../components/ui/LoadingFallback';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public Pages
const Home = lazy(() => import('../pages/public/Home'));
const About = lazy(() => import('../pages/public/About'));
const Services = lazy(() => import('../pages/public/Services'));
const ServiceDetail = lazy(() => import('../pages/public/ServiceDetail'));
const Projects = lazy(() => import('../pages/public/Projects'));
const ProjectDetail = lazy(() => import('../pages/public/ProjectDetail'));
const Contact = lazy(() => import('../pages/public/Contact'));
const Pricing = lazy(() => import('../pages/public/Pricing'));
const Blog = lazy(() => import('../pages/public/Blog'));
const BlogDetail = lazy(() => import('../pages/public/BlogDetail'));
const CreateAdmin = lazy(() => import('../pages/CreateAdmin'));

// Admin Pages
const Login = lazy(() => import('../pages/admin/Login'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const ManageProjects = lazy(() => import('../pages/admin/ManageProjects'));
const ManageServices = lazy(() => import('../pages/admin/ManageServices'));
const ManageBlogs = lazy(() => import('../pages/admin/ManageBlogs'));
const ManageMessages = lazy(() => import('../pages/admin/ManageMessages'));
const SiteSettings = lazy(() => import('../pages/admin/SiteSettings'));
const ManagePricing = lazy(() => import('../pages/admin/ManagePricing'));
const ManageTechnologies = lazy(() => import('../pages/admin/ManageTechnologies'));
const ManageTestimonials = lazy(() => import('../pages/admin/ManageTestimonials'));

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
            <ScrollToTop />
            <Suspense fallback={<LoadingFallback />}>
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
            </Suspense>
        </BrowserRouter>
    );
};

export default AppRoutes;
