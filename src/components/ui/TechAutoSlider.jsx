import { useMemo } from 'react';
import * as Icons from 'react-icons/fa';

const TechAutoSlider = ({ technologies = [] }) => {
    // Filter active technologies and duplicate for seamless loop
    const activeTechs = useMemo(() => {
        const active = technologies.filter(t => t.active);
        return [...active, ...active, ...active]; // Triple for smoother infinite scroll
    }, [technologies]);

    return (
        <>
            <style>{`
                @keyframes scroll-tech-left {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333%);
                    }
                }

                .tech-infinite-scroll {
                    animation: scroll-tech-left 30s linear infinite;
                }

                .tech-scroll-container {
                    mask: linear-gradient(
                        90deg,
                        transparent 0%,
                        black 5%,
                        black 95%,
                        transparent 100%
                    );
                    -webkit-mask: linear-gradient(
                        90deg,
                        transparent 0%,
                        black 5%,
                        black 95%,
                        transparent 100%
                    );
                }

                .tech-item {
                    transition: transform 0.4s ease, box-shadow 0.4s ease;
                }

                .tech-item:hover {
                    transform: translateY(-8px) scale(1.05);
                    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.3);
                }

                .tech-item:hover .tech-icon {
                    transform: rotate(5deg) scale(1.1);
                }

                .tech-icon {
                    transition: transform 0.3s ease;
                }
            `}</style>

            <div className="w-full py-16 relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />

                {/* Decorative blurs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

                {/* Scrolling technologies container */}
                <div className="relative z-10 w-full">
                    <div className="tech-scroll-container w-full">
                        <div className="tech-infinite-scroll flex gap-8 w-max px-4">
                            {activeTechs.map((tech, index) => {
                                const IconComponent = Icons[tech.icon] || Icons.FaCode;

                                return (
                                    <div
                                        key={`${tech.id}-${index}`}
                                        className="tech-item flex-shrink-0 w-48 h-48 rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100"
                                    >
                                        <div className="w-full h-full flex flex-col items-center justify-center p-6 hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5">
                                            <div
                                                className="tech-icon w-20 h-20 flex items-center justify-center mb-4 rounded-xl"
                                                style={{
                                                    backgroundColor: `${tech.color}15`,
                                                }}
                                            >
                                                <IconComponent
                                                    className="text-5xl"
                                                    style={{ color: tech.color }}
                                                />
                                            </div>
                                            <p className="text-lg font-bold text-gray-800 text-center">
                                                {tech.name}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TechAutoSlider;
