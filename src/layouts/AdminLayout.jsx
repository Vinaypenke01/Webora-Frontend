import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaProjectDiagram, FaCog, FaBlog, FaEnvelope, FaSignOutAlt, FaTools } from 'react-icons/fa';
import logo from '../assets/logo.png';

const AdminLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: FaHome },
        { name: 'Projects', path: '/admin/projects', icon: FaProjectDiagram },
        { name: 'Services', path: '/admin/services', icon: FaTools },
        { name: 'Blogs', path: '/admin/blogs', icon: FaBlog },
        { name: 'Messages', path: '/admin/messages', icon: FaEnvelope },
        { name: 'Settings', path: '/admin/settings', icon: FaCog },
    ];

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-primary to-secondary text-white flex-shrink-0">
                <div className="p-6">
                    <img src={logo} alt="DigitalCore" className="h-14 mb-8" />

                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-white/20 text-white'
                                        : 'text-gray-200 hover:bg-white/10 hover:text-white'
                                    }`
                                }
                            >
                                <item.icon className="text-xl" />
                                <span className="font-medium">{item.name}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="absolute bottom-0 w-64 p-6 border-t border-white/20">
                    <div className="mb-4">
                        <p className="text-sm text-gray-300">Logged in as</p>
                        <p className="font-medium">{user?.name || 'Admin'}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
