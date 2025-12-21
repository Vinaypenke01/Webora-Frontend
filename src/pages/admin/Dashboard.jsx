import { useApp } from '../../context/AppContext';
import { FaProjectDiagram, FaEnvelope, FaBlog, FaChartLine } from 'react-icons/fa';
import Card from '../../components/ui/Card';

const Dashboard = () => {
    const { projects, blogs, messages } = useApp();

    const unreadMessages = messages.filter(m => !m.read).length;

    const stats = [
        {
            title: 'Total Projects',
            value: projects.length,
            icon: FaProjectDiagram,
            color: 'from-blue-500 to-blue-600',
        },
        {
            title: 'Blog Posts',
            value: blogs.length,
            icon: FaBlog,
            color: 'from-purple-500 to-purple-600',
        },
        {
            title: 'Unread Messages',
            value: unreadMessages,
            icon: FaEnvelope,
            color: 'from-green-500 to-green-600',
        },
        {
            title: 'Total Messages',
            value: messages.length,
            icon: FaChartLine,
            color: 'from-orange-500 to-orange-600',
        },
    ];

    const recentMessages = messages.slice(-5).reverse();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
                <p className="text-gray-600">Welcome back! Here's what's happening with your website.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <Card key={index} className="relative overflow-hidden">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center`}>
                                <stat.icon className="text-3xl text-white" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Messages */}
                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold">Recent Messages</h3>
                        <span className="text-sm text-gray-600">{recentMessages.length} total</span>
                    </div>

                    {recentMessages.length > 0 ? (
                        <div className="space-y-4">
                            {recentMessages.map(message => (
                                <div
                                    key={message.id}
                                    className={`p-4 rounded-lg ${message.read ? 'bg-gray-50' : 'bg-blue-50'}`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <p className="font-semibold text-gray-900">{message.name}</p>
                                            <p className="text-sm text-gray-600">{message.email}</p>
                                        </div>
                                        {!message.read && (
                                            <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                                                New
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-700">{message.message.slice(0, 100)}...</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-8">No messages yet</p>
                    )}
                </Card>

                {/* Recent Projects */}
                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold">Recent Projects</h3>
                        <span className="text-sm text-gray-600">{projects.length} total</span>
                    </div>

                    {projects.length > 0 ? (
                        <div className="space-y-4">
                            {projects.slice(-5).reverse().map(project => (
                                <div key={project.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">{project.title}</p>
                                        <p className="text-sm text-gray-600 capitalize">{project.category}</p>
                                    </div>
                                    {project.featured && (
                                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                                            Featured
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-8">No projects yet</p>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
