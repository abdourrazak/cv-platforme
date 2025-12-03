import React from 'react'
import { CVData } from '@/types/cv'
import { MapPin, Mail, Phone, Globe, Linkedin } from 'lucide-react'

interface TemplateProps {
    data: CVData
    colorScheme?: string
    fontFamily?: string
}

export function ExecutiveTemplate({ data, colorScheme = 'slate', fontFamily = 'merriweather' }: TemplateProps) {
    const { personalInfo, summary, experiences, education, skills, languages } = data

    // Mapping des couleurs
    const colors = {
        blue: {
            text: 'text-blue-800',
            bg: 'bg-blue-900',
            border: 'border-blue-900',
            accent: 'bg-blue-100'
        },
        purple: {
            text: 'text-indigo-800',
            bg: 'bg-indigo-900',
            border: 'border-indigo-900',
            accent: 'bg-indigo-100'
        },
        green: {
            text: 'text-emerald-800',
            bg: 'bg-emerald-900',
            border: 'border-emerald-900',
            accent: 'bg-emerald-100'
        },
        red: {
            text: 'text-red-800',
            bg: 'bg-red-900',
            border: 'border-red-900',
            accent: 'bg-red-100'
        },
        black: {
            text: 'text-gray-900',
            bg: 'bg-gray-900',
            border: 'border-gray-900',
            accent: 'bg-gray-100'
        },
    }

    const theme = colors[colorScheme as keyof typeof colors] || colors.black

    return (
        <div className={`w-full h-full min-h-[297mm] bg-white text-gray-800 font-${fontFamily}`} id="cv-preview">
            {/* Header */}
            <header className={`${theme.bg} text-white p-10`}>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-serif font-bold mb-2 tracking-wide">
                            {personalInfo.firstName} {personalInfo.lastName}
                        </h1>
                        <h2 className="text-xl font-light tracking-widest uppercase opacity-90">
                            {personalInfo.title}
                        </h2>
                    </div>
                    {/* Initiales stylisées si pas de photo */}
                    <div className="w-16 h-16 border-2 border-white/30 flex items-center justify-center text-2xl font-serif">
                        {personalInfo.firstName[0]}{personalInfo.lastName[0]}
                    </div>
                </div>

                <div className="flex flex-wrap gap-6 mt-8 text-sm opacity-90 border-t border-white/20 pt-6">
                    {personalInfo.email && (
                        <div className="flex items-center gap-2">
                            <Mail size={14} />
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-center gap-2">
                            <Phone size={14} />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {(personalInfo.city || personalInfo.country) && (
                        <div className="flex items-center gap-2">
                            <MapPin size={14} />
                            <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                        </div>
                    )}
                    {personalInfo.linkedin && (
                        <div className="flex items-center gap-2">
                            <Linkedin size={14} />
                            <span>{personalInfo.linkedin}</span>
                        </div>
                    )}
                </div>
            </header>

            <div className="p-10 space-y-8">
                {/* Summary */}
                {summary && (
                    <section>
                        <h3 className={`text-sm font-bold uppercase tracking-widest mb-3 ${theme.text} border-b-2 ${theme.border} pb-1 w-full`}>
                            Profil Professionnel
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-justify">
                            {summary}
                        </p>
                    </section>
                )}

                {/* Skills - 3 Columns */}
                {skills.length > 0 && (
                    <section>
                        <h3 className={`text-sm font-bold uppercase tracking-widest mb-4 ${theme.text} border-b-2 ${theme.border} pb-1 w-full`}>
                            Compétences Clés
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            {skills.map((skill) => (
                                <div key={skill.id} className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${theme.bg}`}></div>
                                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {experiences.length > 0 && (
                    <section>
                        <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 ${theme.text} border-b-2 ${theme.border} pb-1 w-full`}>
                            Expérience Professionnelle
                        </h3>
                        <div className="space-y-6">
                            {experiences.map((exp) => (
                                <div key={exp.id} className="grid grid-cols-12 gap-4">
                                    {/* Date Column */}
                                    <div className="col-span-3 text-sm font-bold text-gray-500 pt-1">
                                        {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
                                        <div className="text-xs font-normal mt-1 text-gray-400">{exp.location}</div>
                                    </div>

                                    {/* Content Column */}
                                    <div className="col-span-9">
                                        <h4 className="text-lg font-bold text-gray-900">{exp.position}</h4>
                                        <div className={`text-sm font-semibold mb-2 ${theme.text}`}>{exp.company}</div>
                                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-10">
                    {/* Education */}
                    {education.length > 0 && (
                        <section>
                            <h3 className={`text-sm font-bold uppercase tracking-widest mb-4 ${theme.text} border-b-2 ${theme.border} pb-1 w-full`}>
                                Formation
                            </h3>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                                        <div className="text-sm text-gray-600">{edu.institution}</div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {edu.startDate} - {edu.endDate}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages.length > 0 && (
                        <section>
                            <h3 className={`text-sm font-bold uppercase tracking-widest mb-4 ${theme.text} border-b-2 ${theme.border} pb-1 w-full`}>
                                Langues
                            </h3>
                            <div className="space-y-3">
                                {languages.map((lang) => (
                                    <div key={lang.id} className="flex justify-between items-center border-b border-gray-100 pb-2">
                                        <span className="font-medium text-gray-800">{lang.name}</span>
                                        <span className="text-sm text-gray-500 italic">{lang.level}</span>
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
