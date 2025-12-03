import React from 'react'
import { CVData } from '@/types/cv'
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react'

interface TemplateProps {
    data: CVData
    colorScheme?: string
    fontFamily?: string
}

export function ExecutiveTemplate({ data, colorScheme = 'black', fontFamily = 'serif' }: TemplateProps) {
    const { personalInfo, summary, experiences, education, skills, languages } = data

    const colors = {
        blue: { primary: '#1e3a8a', bg: '#eff6ff', text: '#1e3a8a' },
        purple: { primary: '#581c87', bg: '#faf5ff', text: '#581c87' },
        green: { primary: '#065f46', bg: '#ecfdf5', text: '#065f46' },
        red: { primary: '#991b1b', bg: '#fef2f2', text: '#991b1b' },
        black: { primary: '#111827', bg: '#f9fafb', text: '#111827' },
    }

    const theme = colors[colorScheme as keyof typeof colors] || colors.black

    return (
        <div className="w-full h-full min-h-[297mm] bg-white" id="cv-preview">
            {/* Header avec fond élégant */}
            <header className="px-12 py-10" style={{ backgroundColor: theme.bg }}>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h1 className="text-5xl font-serif font-bold mb-3 tracking-tight" style={{ color: theme.primary }}>
                            {personalInfo.firstName} {personalInfo.lastName}
                        </h1>
                        <p className="text-2xl text-gray-600 font-light tracking-widest mb-6">
                            {personalInfo.title}
                        </p>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
                            {personalInfo.email && (
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: 'white' }}>
                                        <Mail size={14} style={{ color: theme.primary }} />
                                    </div>
                                    <span>{personalInfo.email}</span>
                                </div>
                            )}
                            {personalInfo.phone && (
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: 'white' }}>
                                        <Phone size={14} style={{ color: theme.primary }} />
                                    </div>
                                    <span>{personalInfo.phone}</span>
                                </div>
                            )}
                            {(personalInfo.city || personalInfo.country) && (
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: 'white' }}>
                                        <MapPin size={14} style={{ color: theme.primary }} />
                                    </div>
                                    <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                                </div>
                            )}
                            {personalInfo.linkedin && (
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: 'white' }}>
                                        <Linkedin size={14} style={{ color: theme.primary }} />
                                    </div>
                                    <span className="truncate">{personalInfo.linkedin}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {personalInfo.photo && (
                        <div className="w-36 h-36 rounded-sm overflow-hidden shadow-xl border-4 border-white">
                            <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>
            </header>

            <div className="px-12 py-8 space-y-8">
                {/* Summary */}
                {summary && (
                    <section>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-px flex-1" style={{ backgroundColor: theme.primary }}></div>
                            <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: theme.primary }}>
                                Synthèse Professionnelle
                            </h2>
                            <div className="h-px flex-1" style={{ backgroundColor: theme.primary }}></div>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-center italic px-8">
                            "{summary}"
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experiences.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px flex-1" style={{ backgroundColor: theme.primary }}></div>
                            <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: theme.primary }}>
                                Parcours Professionnel
                            </h2>
                            <div className="h-px flex-1" style={{ backgroundColor: theme.primary }}></div>
                        </div>
                        <div className="space-y-6">
                            {experiences.map((exp) => (
                                <div key={exp.id} className="grid grid-cols-4 gap-6">
                                    <div className="text-right">
                                        <div className="text-sm font-bold" style={{ color: theme.primary }}>
                                            {exp.startDate}
                                        </div>
                                        <div className="text-sm font-bold" style={{ color: theme.primary }}>
                                            {exp.current ? 'Présent' : exp.endDate}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-2">{exp.location}</div>
                                    </div>
                                    <div className="col-span-3">
                                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-1">{exp.position}</h3>
                                        <div className="text-base font-semibold mb-3" style={{ color: theme.primary }}>
                                            {exp.company}
                                        </div>
                                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-12">
                    {/* Education */}
                    {education.length > 0 && (
                        <section>
                            <div className="flex items-center gap-4 mb-4">
                                <h2 className="text-sm font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: theme.primary }}>
                                    Formation
                                </h2>
                                <div className="h-px flex-1" style={{ backgroundColor: theme.primary }}></div>
                            </div>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id} className="border-l-2 pl-4" style={{ borderColor: theme.bg }}>
                                        <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                        <div className="text-sm font-semibold mt-1" style={{ color: theme.primary }}>
                                            {edu.institution}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {edu.startDate} - {edu.endDate}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills & Languages */}
                    <section className="space-y-6">
                        {skills.length > 0 && (
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <h2 className="text-sm font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: theme.primary }}>
                                        Expertises
                                    </h2>
                                    <div className="h-px flex-1" style={{ backgroundColor: theme.primary }}></div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <span
                                            key={skill.id}
                                            className="px-3 py-1.5 text-xs font-medium rounded"
                                            style={{ backgroundColor: theme.bg, color: theme.text }}
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {languages.length > 0 && (
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <h2 className="text-sm font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: theme.primary }}>
                                        Langues
                                    </h2>
                                    <div className="h-px flex-1" style={{ backgroundColor: theme.primary }}></div>
                                </div>
                                <div className="space-y-2">
                                    {languages.map((lang) => (
                                        <div key={lang.id} className="flex justify-between items-center text-sm">
                                            <span className="font-medium text-gray-700">{lang.name}</span>
                                            <span className="text-gray-500">{lang.level}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}
