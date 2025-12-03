import React from 'react'
import { CVData } from '@/types/cv'
import { Mail, Phone, MapPin, Linkedin, Globe, Briefcase, GraduationCap } from 'lucide-react'

interface TemplateProps {
    data: CVData
    colorScheme?: string
    fontFamily?: string
}

export function CreativeTemplate({ data, colorScheme = 'purple', fontFamily = 'inter' }: TemplateProps) {
    const { personalInfo, summary, experiences, education, skills, languages } = data

    const colors = {
        blue: {
            primary: '#3b82f6',
            gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            light: '#eff6ff',
            text: '#1e40af'
        },
        purple: {
            primary: '#8b5cf6',
            gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
            light: '#f5f3ff',
            text: '#6d28d9'
        },
        green: {
            primary: '#10b981',
            gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            light: '#ecfdf5',
            text: '#047857'
        },
        red: {
            primary: '#ef4444',
            gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            light: '#fef2f2',
            text: '#b91c1c'
        },
        black: {
            primary: '#1f2937',
            gradient: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
            light: '#f9fafb',
            text: '#111827'
        },
    }

    const theme = colors[colorScheme as keyof typeof colors] || colors.purple

    return (
        <div className="w-full h-full min-h-[297mm] bg-white flex" id="cv-preview">
            {/* Sidebar colorée */}
            <aside className="w-[35%] text-white p-8 flex flex-col" style={{ background: theme.gradient }}>
                {/* Photo */}
                <div className="mb-8">
                    {personalInfo.photo ? (
                        <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                            <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="w-40 h-40 mx-auto rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center">
                            <span className="text-6xl font-bold">
                                {personalInfo.firstName[0]}{personalInfo.lastName[0]}
                            </span>
                        </div>
                    )}
                </div>

                {/* Contact */}
                <div className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b border-white/30">
                        Contact
                    </h3>
                    <div className="space-y-3 text-sm">
                        {personalInfo.email && (
                            <div className="flex items-start gap-3">
                                <Mail size={16} className="mt-0.5 flex-shrink-0" />
                                <span className="break-all">{personalInfo.email}</span>
                            </div>
                        )}
                        {personalInfo.phone && (
                            <div className="flex items-center gap-3">
                                <Phone size={16} className="flex-shrink-0" />
                                <span>{personalInfo.phone}</span>
                            </div>
                        )}
                        {(personalInfo.city || personalInfo.country) && (
                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                                <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                            </div>
                        )}
                        {personalInfo.linkedin && (
                            <div className="flex items-start gap-3">
                                <Linkedin size={16} className="mt-0.5 flex-shrink-0" />
                                <span className="break-all">{personalInfo.linkedin}</span>
                            </div>
                        )}
                        {personalInfo.website && (
                            <div className="flex items-start gap-3">
                                <Globe size={16} className="mt-0.5 flex-shrink-0" />
                                <span className="break-all">{personalInfo.website}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b border-white/30">
                            Compétences
                        </h3>
                        <div className="space-y-3">
                            {skills.map((skill) => (
                                <div key={skill.id}>
                                    <div className="flex justify-between text-sm mb-1.5">
                                        <span className="font-medium">{skill.name}</span>
                                    </div>
                                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-white rounded-full transition-all shadow-sm"
                                            style={{
                                                width: skill.level === 'expert' ? '100%' :
                                                    skill.level === 'advanced' ? '80%' :
                                                        skill.level === 'intermediate' ? '60%' : '40%'
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {languages.length > 0 && (
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 pb-2 border-b border-white/30">
                            Langues
                        </h3>
                        <div className="space-y-3">
                            {languages.map((lang) => (
                                <div key={lang.id} className="flex justify-between items-center text-sm">
                                    <span className="font-medium">{lang.name}</span>
                                    <span className="text-xs bg-white/20 px-2 py-1 rounded">{lang.level}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-5xl font-bold mb-2" style={{ color: theme.text }}>
                        {personalInfo.firstName}<br />
                        {personalInfo.lastName}
                    </h1>
                    <div className="h-1 w-20 mb-4" style={{ backgroundColor: theme.primary }}></div>
                    <p className="text-xl text-gray-600 font-medium uppercase tracking-wider">
                        {personalInfo.title}
                    </p>
                </header>

                {/* Summary */}
                {summary && (
                    <section className="mb-8 p-4 rounded-lg" style={{ backgroundColor: theme.light }}>
                        <p className="text-gray-700 leading-relaxed italic">
                            {summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experiences.length > 0 && (
                    <section className="mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.primary }}>
                                <Briefcase size={20} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: theme.text }}>
                                Expérience
                            </h2>
                        </div>
                        <div className="space-y-6">
                            {experiences.map((exp) => (
                                <div key={exp.id} className="relative pl-8 border-l-2" style={{ borderColor: theme.light }}>
                                    <div className="absolute -left-2 top-1 w-4 h-4 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                                    <div className="mb-2">
                                        <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                                        <div className="flex items-center gap-2 text-sm mt-1">
                                            <span className="font-semibold" style={{ color: theme.primary }}>
                                                {exp.company}
                                            </span>
                                            <span className="text-gray-400">•</span>
                                            <span className="text-gray-500">{exp.location}</span>
                                        </div>
                                        <div className="text-xs text-gray-400 mt-1">
                                            {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.primary }}>
                                <GraduationCap size={20} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-bold" style={{ color: theme.text }}>
                                Formation
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id} className="p-4 rounded-lg" style={{ backgroundColor: theme.light }}>
                                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                    <div className="flex items-center justify-between mt-1">
                                        <span className="text-sm font-semibold" style={{ color: theme.primary }}>
                                            {edu.institution}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {edu.startDate} - {edu.endDate}
                                        </span>
                                    </div>
                                    {edu.description && (
                                        <p className="text-sm text-gray-600 mt-2">{edu.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    )
}
