import { useApp } from '../../context/AppContext';
import { FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { useState } from 'react';

const ManageMessages = () => {
    const { messages, markMessageRead, deleteMessage } = useApp();
    const [success, setSuccess] = useState('');

    const handleMarkRead = async (id) => {
        try {
            await markMessageRead(id);
            setSuccess('Message marked as read');
            setTimeout(() => setSuccess(''), 2000);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await deleteMessage(id);
                setSuccess('Message deleted successfully');
                setTimeout(() => setSuccess(''), 2000);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const unreadMessages = messages.filter(m => !m.read);
    const readMessages = messages.filter(m => m.read);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Messages</h1>
                <p className="text-gray-600">
                    {unreadMessages.length} unread message{unreadMessages.length !== 1 ? 's' : ''}
                </p>
            </div>

            {success && <Alert type="success" message={success} autoClose className="mb-6" />}

            {/* Unread Messages */}
            {unreadMessages.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Unread Messages</h2>
                    <div className="space-y-4">
                        {unreadMessages.map(message => (
                            <Card key={message.id} className="bg-blue-50 border-l-4 border-blue-500">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg">{message.name}</h3>
                                        <p className="text-gray-600">{message.email}</p>
                                        {message.phone && <p className="text-gray-600">{message.phone}</p>}
                                        {message.createdAt && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                {new Date(message.createdAt).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                    <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">New</span>
                                </div>
                                <p className="text-gray-700 mb-4">{message.message}</p>
                                <div className="flex gap-2">
                                    <Button variant="primary" size="sm" icon={<FaCheckCircle />} onClick={() => handleMarkRead(message.id)}>
                                        Mark as Read
                                    </Button>
                                    <Button variant="danger" size="sm" icon={<FaTrash />} onClick={() => handleDelete(message.id)}>
                                        Delete
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Read Messages */}
            {readMessages.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Read Messages</h2>
                    <div className="space-y-4">
                        {readMessages.map(message => (
                            <Card key={message.id} className="bg-gray-50">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg">{message.name}</h3>
                                        <p className="text-gray-600">{message.email}</p>
                                        {message.phone && <p className="text-gray-600">{message.phone}</p>}
                                        {message.createdAt && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                {new Date(message.createdAt).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-4">{message.message}</p>
                                <Button variant="danger" size="sm" icon={<FaTrash />} onClick={() => handleDelete(message.id)}>
                                    Delete
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {messages.length === 0 && (
                <Card className="text-center py-12">
                    <p className="text-gray-500 text-lg">No messages yet</p>
                </Card>
            )}
        </div>
    );
};

export default ManageMessages;
