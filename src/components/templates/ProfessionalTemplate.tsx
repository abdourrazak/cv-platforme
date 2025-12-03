import React from 'react'
import { CVData } from '@/types/cv'

interface TemplateProps {
    data: CVData
    colorScheme?: string
    fontFamily?: string
}

export function ProfessionalTemplate({ data, colorScheme = 'blue', fontFamily = 'inter' }: TemplateProps) {
    const { personalInfo, summary, experiences, education, skills, languages } = data

    const colors = {
        blue: { primary: '#1e40af', secondary: '#3b82f6', bg: '#eff6ff' },
        purple: { primary: '#6d28d9', secondary: '#8b5cf6', bg: '#f5f3ff' },
        green: { primary: '#047857', secondary: '#10b981', bg: '#ecfdf5' },
        red: { primary: '#b91c1c', secondary: '#ef4444', bg: '#fef2f2' },
        black: { primary: '#111827', secondary: '#374151', bg: '#f9fafb' },
    }

    const theme = colors[colorScheme as keyof typeof colors] || colors.blue

    return (
        <div className="w-full h-full min-h-[297mm] bg-white" id="cv-preview">
            {/* Header avec bande colorée */}
            <div className="h-3" style={{ backgroundColor: theme.primary }}></div>

            <div className="px-12 py-10">
                {/* En-tête */}
                <header className="mb-10">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-baseline gap-4 mb-3">
                                <h1 className="text-5xl font-bold tracking-tight" style={{ color: theme.primary }}>
                                    {personalInfo.firstName} {personalInfo.lastName}
                                </h1>
                            </div>
                            <p className="text-xl text-gray-600 font-medium mb-6">
                                {personalInfo.title}
                            </p>

                            <div className="grid grid-cols-3 gap-4 text-sm">
                                {personalInfo.email && (
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</span>
                                        <span className="text-gray-700 font-medium">{personalInfo.email}</span>
                                    </div>
                                )}
                                {personalInfo.phone && (
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">Téléphone</span>
                                        <span className="text-gray-700 font-medium">{personalInfo.phone}</span>
                                    </div>
                                )}
                                {(personalInfo.city || personalInfo.country) && (
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">Localisation</span>
                                        <span className="text-gray-700 font-medium">
                                            {[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}
                                        </span>
                                    </div>
                                )}
                                {personalInfo.linkedin && (
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">LinkedIn</span>
                                        <span className="text-gray-700 font-medium truncate">{personalInfo.linkedin}</span>
                                    </div>
                                )}
                                {personalInfo.website && (
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">Site Web</span>
                                        <span className="text-gray-700 font-medium truncate">{personalInfo.website}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {personalInfo.photo && (
                            <div className="w-32 h-32 rounded-lg overflow-hidden shadow-lg ml-8" style={{ border: `3px solid ${theme.primary}` }}>
                                <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                </header>

                {/* Summary */}
                {summary && (
                    <section className="mb-8 p-6 rounded-lg" style={{ backgroundColor: theme.bg }}>
                        <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: theme.primary }}>
                            Profil Professionnel
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experiences.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xs font-bold uppercase tracking-widest mb-6 pb-2 border-b-2" style={{ color: theme.primary, borderColor: theme.primary }}>
                            Expérience Professionnelle
                        </h2>
                        <div className="space-y-6">
                            {experiences.map((exp, index) => (
                                <div key={exp.id} className="relative">
                                    {index > 0 && <div className="absolute -top-3 left-0 right-0 h-px bg-gray-200"></div>}
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="font-semibold" style={{ color: theme.secondary }}>
                                                    {exp.company}
                                                </span>
                                                <span className="text-sm text-gray-500">{exp.location}</span>
                                            </div>
                                        </div>
                                        <div className="text-right ml-4">
                                            <div className="text-sm font-medium text-gray-600">
                                                {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed mt-2 whitespace-pre-line">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-3 gap-8">
                    {/* Education */}
                    {education.length > 0 && (
                        <section className="col-span-2">
                            <h2 className="text-xs font-bold uppercase tracking-widest mb-6 pb-2 border-b-2" style={{ color: theme.primary, borderColor: theme.primary }}>
                                Formation
                            </h2>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-sm font-semibold" style={{ color: theme.secondary }}>
                                                {edu.institution}
                                            </span>
                                            <span className="text-xs text-gray-500">
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

                    {/* Skills & Languages */}
                    <section className="space-y-6">
                        {skills.length > 0 && (
                            <div>
                                <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-2 border-b-2" style={{ color: theme.primary, borderColor: theme.primary }}>
                                    Compétences
                                </h2>
                                <div className="space-y-2">
                                    {skills.map((skill) => (
                                        <div key={skill.id} className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                                            <span className="text-sm text-gray-700">{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {languages.length > 0 && (
                            <div>
                                <h2 className="text-xs font-bold uppercase tracking-widest mb-4 pb-2 border-b-2" style={{ color: theme.primary, borderColor: theme.primary }}>
                                    Langues
                                </h2>
                                <div className="space-y-2">
                                    {languages.map((lang) => (
                                        <div key={lang.id} className="text-sm">
                                            <div className="font-medium text-gray-700">{lang.name}</div>
                                            <div className="text-xs text-gray-500">{lang.level}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>

            {/* Footer avec bande colorée */}
            <div className="h-2 mt-auto" style={{ backgroundColor: theme.primary }}></div>
        </div>
    )
}
