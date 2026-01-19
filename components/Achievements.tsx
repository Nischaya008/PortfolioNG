import React from 'react';
import { Trophy, Award, CheckCircle2 } from 'lucide-react';
import { ACHIEVEMENTS, CERTIFICATIONS } from '../constants';

const Achievements: React.FC = () => {
    return (
        <section id="achievements" className="py-20 bg-zinc-900/30 border-t border-white/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row gap-12 md:gap-20">

                    {/* Achievements Column */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                <Trophy size={24} className="text-yellow-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Achievements</h3>
                        </div>

                        <div className="space-y-4">
                            {ACHIEVEMENTS.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-white/5 hover:border-primary/20 transition-all group">
                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></div>
                                    <p className="text-gray-300 text-sm leading-relaxed font-medium">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications Column */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                <Award size={24} className="text-blue-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Certifications</h3>
                        </div>

                        <div className="space-y-4">
                            {CERTIFICATIONS.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-white/5 hover:border-primary/20 transition-all group">
                                    <CheckCircle2 size={16} className="text-gray-500 group-hover:text-primary transition-colors" />
                                    <p className="text-gray-300 text-sm font-medium">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Achievements;
