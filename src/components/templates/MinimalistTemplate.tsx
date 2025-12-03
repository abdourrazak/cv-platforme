import React from 'react'
import { CVData } from '@/types/cv'

interface TemplateProps {
    data: CVData
    colorScheme?: string
    fontFamily?: string
}

export function MinimalistTemplate({ data, colorScheme = 'black', fontFamily = 'inter' }: TemplateProps) {
    const { personalInfo, summary, experiences, education, skills, languages } = data

    const colors = {
        blue: { accent: '#2563eb', light: '#eff6ff' },
        purple: { accent: '#7c3aed', light: '#f5f3ff' },
        green: { accent: '#059669', light: '#ecfdf5' },
        red: { accent: '#dc2626', light: '#fef2f2' },
        black: { accent: '#111827', light: '#f9fafb' },
    }

    const theme = colors[colorScheme as keyof typeof colors] || colors.black

    return (
        <div className="w-full h-full min-h-[297mm] bg-white p-12 font-sans" id="cv-preview">
            {/* Header minimaliste */}
            <header className="mb-10 pb-8 border-b-2" style={{ borderColor: theme.accent }}>
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                        <h1 className="text-6xl font-light mb-3 tracking-tight text-gray-900">
                            {personalInfo.firstName}
                        </h1>
                        <h1 className="text-6xl font-bold mb-4 tracking-tight" style={{ color: theme.accent }}>
                            {personalInfo.lastName}
                        </h1>
                        <p className="text-lg text-gray-600 font-light tracking-wide">
                            {personalInfo.title}
                        </p>
                    </div>
                    {personalInfo.photo && (
                        <div className="w-32 h-32 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all">
                            <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-600 mt-6">
                    {personalInfo.email && <div>{personalInfo.email}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {(personalInfo.city || personalInfo.country) && (
                        <div>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</div>
                    )}
                    {personalInfo.linkedin && <div className="truncate">{personalInfo.linkedin}</div>}
                    {personalInfo.website && <div className="truncate">{personalInfo.website}</div>}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-10">
                    <p className="text-gray-700 leading-relaxed text-justify border-l-4 pl-6 italic" style={{ borderColor: theme.accent }}>
                        {summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experiences.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400">
                        Expérience Professionnelle
                    </h2>
                    <div className="space-y-8">
                        {experiences.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex items-baseline justify-between mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap ml-4">
                                        {exp.startDate} — {exp.current ? 'Présent' : exp.endDate}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="font-semibold" style={{ color: theme.accent }}>
                                        {exp.company}
                                    </span>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-sm text-gray-500">{exp.location}</span>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div className="grid grid-cols-2 gap-12">
                {/* Education */}
                {education.length > 0 && (
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400">
                            Formation
                        </h2>
                        <div className="space-y-6">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <h3 className="font-bold text-gray-900 mb-1">{edu.degree}</h3>
                                    <div className="text-sm font-semibold mb-1" style={{ color: theme.accent }}>
                                        {edu.institution}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {edu.startDate} — {edu.endDate}
                                    </div>
                                    {edu.description && (
                                        <p className="text-sm text-gray-600 mt-2">{edu.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills & Languages */}
                <section className="space-y-8">
                    {skills.length > 0 && (
                        <div>
                            <h2 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400">
                                Compétences
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <span
                                        key={skill.id}
                                        className="text-xs font-medium px-3 py-1.5 rounded-full border"
                                        style={{
                                            borderColor: theme.accent,
                                            color: theme.accent
                                        }}
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {languages.length > 0 && (
                        <div>
                            <h2 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-400">
                                Langues
                            </h2>
                            <div className="space-y-2">
                                {languages.map((lang) => (
                                    <div key={lang.id} className="flex justify-between items-center text-sm">
                                        <span className="font-medium text-gray-700">{lang.name}</span>
                                        <span className="text-xs text-gray-500">{lang.level}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}
