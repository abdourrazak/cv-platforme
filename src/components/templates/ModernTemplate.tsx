import React from 'react'
import { CVData } from '@/types/cv'
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react'

interface TemplateProps {
    data: CVData
    colorScheme?: string
    fontFamily?: string
}

export function ModernTemplate({ data, colorScheme = 'blue', fontFamily = 'inter' }: TemplateProps) {
    const { personalInfo, summary, experiences, education, skills, languages } = data

    const colors = {
        blue: { primary: '#2563eb', light: '#dbeafe', accent: '#1e40af' },
        purple: { primary: '#7c3aed', light: '#ede9fe', accent: '#5b21b6' },
        green: { primary: '#059669', light: '#d1fae5', accent: '#047857' },
        red: { primary: '#dc2626', light: '#fee2e2', accent: '#b91c1c' },
        black: { primary: '#1f2937', light: '#f3f4f6', accent: '#111827' },
    }

    const theme = colors[colorScheme as keyof typeof colors] || colors.blue

    return (
        <div className="w-full h-full min-h-[297mm] bg-white p-12 font-sans" id="cv-preview">
            {/* Header avec design moderne */}
            <header className="mb-10">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                        <h1 className="text-5xl font-bold mb-2 tracking-tight" style={{ color: theme.primary }}>
                            {personalInfo.firstName} {personalInfo.lastName}
                        </h1>
                        <div className="h-1 w-24 mb-4" style={{ backgroundColor: theme.primary }}></div>
                        <p className="text-xl text-gray-600 font-medium tracking-wide uppercase">
                            {personalInfo.title}
                        </p>
                    </div>
                    {personalInfo.photo && (
                        <div className="w-32 h-32 rounded-lg overflow-hidden shadow-lg border-4" style={{ borderColor: theme.light }}>
                            <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600">
                    {personalInfo.email && (
                        <div className="flex items-center gap-2">
                            <Mail size={16} style={{ color: theme.primary }} />
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-center gap-2">
                            <Phone size={16} style={{ color: theme.primary }} />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {(personalInfo.city || personalInfo.country) && (
                        <div className="flex items-center gap-2">
                            <MapPin size={16} style={{ color: theme.primary }} />
                            <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                        </div>
                    )}
                    {personalInfo.linkedin && (
                        <div className="flex items-center gap-2">
                            <Linkedin size={16} style={{ color: theme.primary }} />
                            <span className="truncate">{personalInfo.linkedin}</span>
                        </div>
                    )}
                    {personalInfo.website && (
                        <div className="flex items-center gap-2">
                            <Globe size={16} style={{ color: theme.primary }} />
                            <span className="truncate">{personalInfo.website}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-3 pb-2 border-b-2" style={{ color: theme.primary, borderColor: theme.primary }}>
                        Profil Professionnel
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-justify">
                        {summary}
                    </p>
                </section>
            )}

            <div className="grid grid-cols-3 gap-8">
                {/* Main Column */}
                <div className="col-span-2 space-y-8">
                    {/* Experience */}
                    {experiences.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" style={{ color: theme.primary, borderColor: theme.primary }}>
                                Expérience Professionnelle
                            </h2>
                            <div className="space-y-6">
                                {experiences.map((exp, index) => (
                                    <div key={exp.id} className="relative pl-6">
                                        <div className="absolute left-0 top-2 w-3 h-3 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                                        {index < experiences.length - 1 && (
                                            <div className="absolute left-[5px] top-5 w-0.5 h-full" style={{ backgroundColor: theme.light }}></div>
                                        )}
                                        <div className="mb-2">
                                            <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                                            <div className="flex items-center justify-between text-sm mt-1">
                                                <span className="font-semibold" style={{ color: theme.primary }}>{exp.company}</span>
                                                <span className="text-gray-500 text-xs">
                                                    {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-0.5">{exp.location}</p>
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
                            <h2 className="text-lg font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" style={{ color: theme.primary, borderColor: theme.primary }}>
                                Formation
                            </h2>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                        <div className="flex items-center justify-between text-sm mt-1">
                                            <span className="font-medium" style={{ color: theme.primary }}>{edu.institution}</span>
                                            <span className="text-gray-500 text-xs">
                                                {edu.startDate} - {edu.endDate}
                                            </span>
                                        </div>
                                        {edu.description && (
                                            <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    {/* Skills */}
                    {skills.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" style={{ color: theme.primary, borderColor: theme.primary }}>
                                Compétences
                            </h2>
                            <div className="space-y-3">
                                {skills.map((skill) => (
                                    <div key={skill.id}>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all"
                                                style={{
                                                    backgroundColor: theme.primary,
                                                    width: skill.level === 'expert' ? '100%' :
                                                        skill.level === 'advanced' ? '80%' :
                                                            skill.level === 'intermediate' ? '60%' : '40%'
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" style={{ color: theme.primary, borderColor: theme.primary }}>
                                Langues
                            </h2>
                            <div className="space-y-3">
                                {languages.map((lang) => (
                                    <div key={lang.id} className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-700">{lang.name}</span>
                                        <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: theme.light, color: theme.accent }}>
                                            {lang.level}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}
