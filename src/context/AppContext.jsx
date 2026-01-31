import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import * as mockData from '../data/mockData';
import Loader from '../components/ui/Loader';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [services] = useState(mockData.services); // Keep services static
    const [blogs, setBlogs] = useState([]);
    const [messages, setMessages] = useState([]);
    const [settings, setSettings] = useState({});
    const [pricingPlans, setPricingPlans] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initializeData();
    }, []);

    const initializeData = async () => {
        try {
            // Initialize storage with mock data
            api.initializeStorage(mockData);

            // Load all data (except services which are static)
            const token = localStorage.getItem('digitalcore_auth_token');
            const [
                projectsData,
                blogsData,
                messagesData,
                settingsData,
                pricingData,
                techData,
                testimonialsData
            ] = await Promise.all([
                api.getProjects(),
                api.getBlogs(),
                token ? api.getMessages().catch(() => null) : Promise.resolve(null),
                api.getSettings(),
                api.getPricingPlans(),
                api.getTechnologies(),
                api.getTestimonials(),
            ]);

            setProjects(projectsData);
            setBlogs(blogsData);
            setSettings(settingsData);
            setPricingPlans(pricingData);
            setTechnologies(techData);
            setTestimonials(testimonialsData);

            // Only set messages if request succeeded
            if (messagesData) setMessages(messagesData);
        } catch (error) {
            console.error('Error loading data:', error);
            // Fallback to mock data on error
            setPricingPlans(mockData.pricingPlans);
            setTechnologies(mockData.techStack);
            setTestimonials(mockData.initialTestimonials);
        } finally {
            setLoading(false);
        }
    };

    // Project operations
    const addProject = async (project) => {
        const newProject = await api.createProject(project);
        setProjects([...projects, newProject]);
        return newProject;
    };

    const updateProject = async (id, updates) => {
        const updated = await api.updateProject(id, updates);
        setProjects(projects.map(p => (p.id === id ? updated : p)));
        return updated;
    };

    const deleteProject = async (id) => {
        await api.deleteProject(id);
        setProjects(projects.filter(p => p.id !== id));
    };



    // Blog operations
    const addBlog = async (blog) => {
        const newBlog = await api.createBlog(blog);
        setBlogs([...blogs, newBlog]);
        return newBlog;
    };

    const updateBlog = async (id, updates) => {
        const updated = await api.updateBlog(id, updates);
        setBlogs(blogs.map(b => (b.id === id ? updated : b)));
        return updated;
    };

    const deleteBlog = async (id) => {
        await api.deleteBlog(id);
        setBlogs(blogs.filter(b => b.id !== id));
    };

    // Message operations
    const addMessage = async (message) => {
        const newMessage = await api.createMessage(message);
        setMessages([...messages, newMessage]);
        return newMessage;
    };

    const markMessageRead = async (id) => {
        const updated = await api.markMessageAsRead(id);
        setMessages(messages.map(m => (m.id === id ? updated : m)));
        return updated;
    };

    const deleteMessage = async (id) => {
        await api.deleteMessage(id);
        setMessages(messages.filter(m => m.id !== id));
    };

    // Settings operations
    const updateSettings = async (updates) => {
        const updated = await api.updateSettings(updates);
        setSettings(updated);
        return updated;
    };

    // Pricing Plan operations
    const addPricingPlan = async (plan) => {
        const newPlan = await api.createPricingPlan(plan);
        setPricingPlans([...pricingPlans, newPlan]);
        return newPlan;
    };

    const updatePricingPlan = async (id, updates) => {
        const updated = await api.updatePricingPlan(id, updates);
        setPricingPlans(pricingPlans.map(p => (p.id === id ? updated : p)));
        return updated;
    };

    const deletePricingPlan = async (id) => {
        await api.deletePricingPlan(id);
        setPricingPlans(pricingPlans.filter(p => p.id !== id));
    };

    // Technology operations
    const addTechnology = async (tech) => {
        const newTech = await api.createTechnology(tech);
        setTechnologies([...technologies, newTech]);
        return newTech;
    };

    const updateTechnology = async (id, updates) => {
        const updated = await api.updateTechnology(id, updates);
        setTechnologies(technologies.map(t => (t.id === id ? updated : t)));
        return updated;
    };

    const deleteTechnology = async (id) => {
        await api.deleteTechnology(id);
        setTechnologies(technologies.filter(t => t.id !== id));
    };

    // Testimonial operations
    const addTestimonial = async (testimonial) => {
        const newTestimonial = await api.createTestimonial(testimonial);
        setTestimonials([...testimonials, newTestimonial]);
        return newTestimonial;
    };

    const updateTestimonial = async (id, updates) => {
        const updated = await api.updateTestimonial(id, updates);
        setTestimonials(testimonials.map(t => (t.id === id ? updated : t)));
        return updated;
    };

    const deleteTestimonial = async (id) => {
        await api.deleteTestimonial(id);
        setTestimonials(testimonials.filter(t => t.id !== id));
    };

    const value = {
        projects,
        services, // Static services from mockData
        blogs,
        messages,
        settings,
        pricingPlans,
        technologies,
        testimonials,
        loading,
        addProject,
        updateProject,
        deleteProject,
        // Service operations removed - services are static
        addBlog,
        updateBlog,
        deleteBlog,
        addMessage,
        markMessageRead,
        deleteMessage,
        updateSettings,
        addPricingPlan,
        updatePricingPlan,
        deletePricingPlan,
        addTechnology,
        updateTechnology,
        deleteTechnology,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        teamMembers: mockData.teamMembers,
    };

    if (loading) {
        return <Loader fullScreen text="Loading DigitalCore..." />;
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
