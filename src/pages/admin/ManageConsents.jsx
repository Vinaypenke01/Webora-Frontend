import { useState, useEffect } from 'react';
import { FaCheck, FaDownload, FaSearch, FaUserCheck, FaClock, FaCalendarCheck } from 'react-icons/fa';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Alert from '../../components/ui/Alert';
import Loader from '../../components/ui/Loader';
import EmptyState from '../../components/ui/EmptyState';
import api from '../../services/api';

const ManageConsents = () => {
    const [consents, setConsents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [actionLoading, setActionLoading] = useState(null);
    const [downloadLoading, setDownloadLoading] = useState(null);
    const [resendLoading, setResendLoading] = useState(null);
    const [tempDates, setTempDates] = useState({}); // To track date inputs before acceptance

    const fetchConsents = async () => {
        try {
            setLoading(true);
            const data = await api.getConsents();
            setConsents(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching consents:', err);
            setError('Failed to load consents. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConsents();
    }, []);

    const handleUpdateConsent = async (id, data) => {
        try {
            await api.acceptConsent(id, data);
            fetchConsents();
        } catch (err) {
            console.error('Error updating consent:', err);
        }
    };

    const handleAccept = async (id) => {
        const deployment_date = tempDates[id];
        if (!deployment_date) {
            alert('Please select an Actual Deployment Date before accepting.');
            return;
        }

        try {
            setActionLoading(id);
            await api.acceptConsent(id, { deployment_date });
            await fetchConsents();
        } catch (err) {
            console.error('Error accepting consent:', err);
            alert('Failed to accept consent.');
        } finally {
            setActionLoading(null);
        }
    };

    const handleResend = async (id) => {
        try {
            setResendLoading(id);
            await api.resendAgreement(id);
            alert('Agreement email resent successfully!');
            fetchConsents();
        } catch (err) {
            console.error('Error resending agreement:', err);
            alert('Failed to resend agreement email. Please check your SMTP settings.');
        } finally {
            setResendLoading(null);
        }
    };

    const handleDownloadCSV = async () => {
        try {
            const blob = await api.exportConsentsCsv();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `consents_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Error downloading CSV:', err);
            alert('Failed to download CSV.');
        }
    };

    const handleDownloadDoc = async (id) => {
        try {
            setDownloadLoading(id);
            const blob = await api.downloadConsentDoc(id);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Consent_${id}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error downloading document:', err);
            alert('Failed to download document.');
        } finally {
            setDownloadLoading(null);
        }
    };

    const filteredConsents = consents.filter(c => 
        c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Loader fullPage tip="Loading consent records..." />;

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <PageHeader 
                    title="Client Consents" 
                    subtitle="Manage and verify client agreements to Terms and Conditions."
                />
                <Button 
                    variant="outline" 
                    onClick={handleDownloadCSV}
                    className="flex items-center gap-2"
                >
                    <FaDownload /> Export CSV
                </Button>
            </div>

            {error && <Alert type="error" message={error} />}

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email or business..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {filteredConsents.length === 0 ? (
                <EmptyState 
                    title="No consents found" 
                    message={searchTerm ? "Try a different search term." : "No client consents have been submitted yet."}
                />
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredConsents.map((consent) => (
                        <div 
                            key={consent.id} 
                            className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <p className="text-sm font-medium text-gray-900">{consent.full_name}</p>
                                        <p className="text-xs text-gray-500">{consent.business_name}</p>
                                        {consent.deployment_date && (
                                            <p className="text-[10px] text-blue-600 font-semibold mt-1 flex items-center gap-1">
                                                <FaCalendarCheck /> Deployed: {new Date(consent.deployment_date).toLocaleDateString()}
                                            </p>
                                        )}
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            consent.status === 'ACCEPTED' 
                                                ? 'bg-green-100 text-green-700' 
                                                : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {consent.status}
                                        </span>
                                        {consent.status === 'ACCEPTED' && (
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                                consent.is_final_email_sent 
                                                    ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                                                    : 'bg-red-50 text-red-600 border border-red-100'
                                            }`}>
                                                {consent.is_final_email_sent ? 'EMAIL SENT' : 'EMAIL FAILED'}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 font-medium">{consent.business_name}</p>
                                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                                        <span className="flex items-center gap-1.5"><FaSearch className="text-xs" /> {consent.email}</span>
                                        <span className="flex items-center gap-1.5"><FaClock className="text-xs" /> {new Date(consent.created_at).toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="flex-1 flex items-center gap-2">
                                    <input 
                                        type="date" 
                                        className={`text-xs border rounded px-2 py-1 outline-none transition-all ${
                                            !consent.deployment_date ? 'border-orange-300 ring-2 ring-orange-50 focus:ring-orange-200' : 'border-gray-200'
                                        }`}
                                        defaultValue={consent.deployment_date ? consent.deployment_date.split('T')[0] : (tempDates[consent.id] || '')}
                                        disabled={consent.status === 'ACCEPTED'}
                                        onChange={(e) => {
                                            const date = e.target.value;
                                            if (consent.status === 'ACCEPTED') {
                                                handleUpdateConsent(consent.id, { deployment_date: date });
                                            } else {
                                                setTempDates(prev => ({ ...prev, [consent.id]: date }));
                                            }
                                        }}
                                        title="Actual Deployment Date"
                                    />
                                    <span className="text-xs text-gray-400">Deployment</span>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                        <Button 
                                            variant="secondary" 
                                            size="sm"
                                            className="flex items-center gap-2"
                                            onClick={() => handleDownloadDoc(consent.id)}
                                            isLoading={downloadLoading === consent.id}
                                        >
                                            <FaDownload /> Download PDF
                                        </Button>
                                    {consent.status === 'PENDING' ? (
                                        <Button 
                                            variant="primary" 
                                            size="sm"
                                            className="flex items-center gap-2"
                                            onClick={() => handleAccept(consent.id)}
                                            isLoading={actionLoading === consent.id}
                                        >
                                            <FaCheck /> Accept Consent
                                        </Button>
                                    ) : (
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="text-right">
                                                <div className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
                                                    <FaUserCheck /> Accepted by {consent.accepted_by_details?.username || 'Admin'}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {new Date(consent.action_date).toLocaleString()}
                                                </div>
                                            </div>
                                            <Button 
                                                variant="outline" 
                                                size="xs"
                                                className="text-[10px] py-1 h-auto"
                                                onClick={() => handleResend(consent.id)}
                                                isLoading={resendLoading === consent.id}
                                            >
                                                Resend Email
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageConsents;
