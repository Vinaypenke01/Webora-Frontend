import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { FaCheck } from 'react-icons/fa';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Pricing = () => {
    const { pricingPlans } = useApp();

    // Filter for active plans and sort by order
    const activePlans = (pricingPlans || []).filter(p => p.active).sort((a, b) => a.order - b.order);

    return (
        <div>
            <PageHeader
                title="Transparent Pricing"
                subtitle="Choose the perfect plan for your project needs"
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Pricing' },
                ]}
            />

            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {pricingPlans.map(plan => (
                            <Card
                                key={plan.id}
                                className={`relative ${plan.popular ? 'ring-4 ring-primary transform scale-105' : ''
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-bold">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                    <p className="text-gray-600 mb-4">{plan.description}</p>
                                    <div className="text-4xl font-bold gradient-text mb-2">
                                        ₹{plan.price}
                                    </div>
                                    {plan.price !== 'Let\'s Talk' && (
                                        <p className="text-sm text-gray-600">One-time payment</p>
                                    )}
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link to="/contact" className="w-full block">
                                    <Button
                                        variant={plan.popular ? 'primary' : 'outline'}
                                        className="w-full"
                                        size="lg"
                                    >
                                        {plan.price === 'Let\'s Talk' ? 'Contact Us' : 'Get Started'}
                                    </Button>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom max-w-4xl mx-auto">
                    <h2 className="text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            {
                                question: 'What\'s included in the pricing?',
                                answer: 'Each plan includes design, development, testing, and deployment. We also provide training and documentation for your team.',
                            },
                            {
                                question: 'Can I upgrade my plan later?',
                                answer: 'Absolutely! You can upgrade your plan at any time. We\'ll credit your previous payment towards the new plan.',
                            },
                            {
                                question: 'Do you offer payment plans?',
                                answer: 'Yes, we offer flexible payment plans. You can pay 50% upfront and 50% upon project completion.',
                            },
                            {
                                question: 'What if I need custom features?',
                                answer: 'Our Custom plan is perfect for unique requirements. We\'ll work with you to create a solution that fits your needs and budget.',
                            },
                        ].map((faq, index) => (
                            <Card key={index}>
                                <h4 className="font-bold text-lg mb-2">{faq.question}</h4>
                                <p className="text-gray-600">{faq.answer}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding hero-gradient text-white">
                <div className="container-custom text-center">
                    <h2 className="mb-6">Not Sure Which Plan Is Right?</h2>
                    <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                        Let's discuss your project requirements and find the perfect solution together
                    </p>
                    <Link to="/contact">
                        <Button variant="accent" size="lg">
                            Schedule a Free Consultation
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Pricing;
