import PageHeader from '../../components/ui/PageHeader';
import { useApp } from '../../context/AppContext';
import { FaCheckCircle } from 'react-icons/fa';
import Card from '../../components/ui/Card';

const About = () => {
    const { settings, teamMembers } = useApp();

    return (
        <div>
            <PageHeader
                title="About DigitalCore"
                subtitle="Learn about our story, mission, and the team behind your digital success"
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'About Us' },
                ]}
            />

            {/* Our Story */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-center mb-8">Our Story</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            {settings.about?.story || 'Founded in 2020, DigitalCore has been helping businesses establish and grow their online presence. We combine technical expertise with creative design to deliver exceptional digital solutions.'}
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Our passion for web development and commitment to client success drives everything we do. We believe in building long-term partnerships with our clients, helping them achieve their business goals through innovative digital solutions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card>
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4">
                                <FaCheckCircle className="text-2xl text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {settings.about?.mission || 'To empower businesses with innovative web solutions that drive growth and success.'}
                            </p>
                        </Card>

                        <Card>
                            <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-xl flex items-center justify-center mb-4">
                                <FaCheckCircle className="text-2xl text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {settings.about?.vision || 'To be the leading web development agency known for excellence, innovation, and client satisfaction.'}
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="mb-4">Meet Our Team</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Talented professionals dedicated to your success
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member) => (
                            <Card key={member.id} className="text-center">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                <p className="text-primary font-semibold mb-3">{member.role}</p>
                                <p className="text-gray-600 mb-4">{member.bio}</p>

                                <div className="flex flex-wrap gap-2 justify-center">
                                    {member.skills.map((skill, index) => (
                                        <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills & Expertise */}
            <section className="section-padding bg-gradient-to-br from-primary via-secondary to-accent text-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="mb-4">Our Expertise</h2>
                        <p className="text-xl text-gray-100 max-w-3xl mx-auto">
                            We master the technologies that power the modern web
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {[
                            'Frontend Development',
                            'Backend Development',
                            'UI/UX Design',
                            'Responsive Design',
                            'E-commerce Solutions',
                            'API Development',
                            'Database Design',
                            'Cloud Deployment',
                            'SEO Optimization',
                            'Performance Tuning',
                            'Security Best Practices',
                            'Agile Methodology',
                        ].map((skill, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <FaCheckCircle className="text-accent-300 flex-shrink-0" />
                                <span>{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
