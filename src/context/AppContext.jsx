import { createContext, useContext, useState, useEffect } from 'react';
import api, { initializeStorage } from '../services/api';
import * as mockData from '../data/mockData';

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
    const [services, setServices] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [messages, setMessages] = useState([]);
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initializeData();
    }, []);

    const initializeData = async () => {
        try {
            // Initialize storage with mock data
            initializeStorage(mockData);

            // Load all data
            const [projectsData, servicesData, blogsData, messagesData, settingsData] = await Promise.all([
                api.getProjects(),
                api.getServices(),
                api.getBlogs(),
                api.getMessages(),
                api.getSettings(),
            ]);

            setProjects(projectsData);
            setServices(servicesData);
            setBlogs(blogsData);
            setMessages(messagesData);
            setSettings(settingsData);
        } catch (error) {
            console.error('Error loading data:', error);
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

    // Service operations
    const addService = async (service) => {
        const newService = await api.createService(service);
        setServices([...services, newService]);
        return newService;
    };

    const updateService = async (id, updates) => {
        const updated = await api.updateService(id, updates);
        setServices(services.map(s => (s.id === id ? updated : s)));
        return updated;
    };

    const deleteService = async (id) => {
        await api.deleteService(id);
        setServices(services.filter(s => s.id !== id));
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

    const value = {
        projects,
        services,
        blogs,
        messages,
        settings,
        loading,
        addProject,
        updateProject,
        deleteProject,
        addService,
        updateService,
        deleteService,
        addBlog,
        updateBlog,
        deleteBlog,
        addMessage,
        markMessageRead,
        deleteMessage,
        updateSettings,
        testimonials: mockData.initialTestimonials,
        teamMembers: mockData.teamMembers,
        techStack: mockData.techStack,
        pricingPlans: mockData.pricingPlans,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
