import React from 'react'
import { CVData } from '@/types/cv'
import { MapPin, Mail, Phone, Globe, Linkedin } from 'lucide-react'

interface TemplateProps {
    data: CVData
    colorScheme?: string
    fontFamily?: string
}

export function MinimalistTemplate({ data, colorScheme = 'black', fontFamily = 'inter' }: TemplateProps) {
    const { personalInfo, summary, experiences, education, skills, languages } = data

    return (
        <div className="w-full h-full bg-white min-h-[297mm] p-12 text-gray-900" id="cv-preview">
            {/* Header - Centré et épuré */}
            <header className="text-center mb-12 pb-6 border-b border-gray-200">
                <h1 className="text-3xl font-light tracking-wide uppercase mb-2">
                    {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                <h2 className="text-base text-gray-600 font-light mb-4">{personalInfo.title}</h2>

                <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-gray-500">
                    {personalInfo.email && (
                        <div className="flex items-center gap-1">
                            <Mail size={12} />
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-center gap-1">
                            <Phone size={12} />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {(personalInfo.city || personalInfo.country) && (
                        <div className="flex items-center gap-1">
                            <MapPin size={12} />
                            <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                        </div>
                    )}
                    {personalInfo.website && (
                        <div className="flex items-center gap-1">
                            <Globe size={12} />
                            <span>{personalInfo.website}</span>
                        </div>
                    )}
                    {personalInfo.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin size={12} />
                            <span>{personalInfo.linkedin}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-10">
                    <p className="text-sm leading-relaxed text-gray-700 text-center italic max-w-3xl mx-auto">
                        {summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experiences.length > 0 && (
                <section className="mb-10">
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-gray-900 border-b pb-2">
                        Expérience Professionnelle
                    </h3>
                    <div className="space-y-6">
                        {experiences.map((exp) => (
                            <div key={exp.id} className="relative pl-4 border-l-2 border-gray-200">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                                        {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600 mb-2">
                                    {exp.company} {exp.location && `• ${exp.location}`}
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="mb-10">
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-gray-900 border-b pb-2">
                        Formation
                    </h3>
                    <div className="space-y-4">
                        {education.map((edu) => (
                            <div key={edu.id} className="relative pl-4 border-l-2 border-gray-200">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                                        {edu.startDate} - {edu.current ? 'Présent' : edu.endDate}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600">
                                    {edu.school} {edu.location && `• ${edu.location}`}
                                </div>
                                {edu.description && (
                                    <p className="text-sm text-gray-500 mt-1">{edu.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div className="grid grid-cols-2 gap-10">
                {/* Skills */}
                {skills.length > 0 && (
                    <section>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-900 border-b pb-2">
                            Compétences
                        </h3>
                        <div className="space-y-1">
                            {skills.map((skill) => (
                                <div key={skill.id} className="text-sm text-gray-700">
                                    • {skill.name}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {languages.length > 0 && (
                    <section>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-900 border-b pb-2">
                            Langues
                        </h3>
                        <div className="space-y-1">
                            {languages.map((lang) => (
                                <div key={lang.id} className="flex justify-between text-sm">
                                    <span className="text-gray-700">{lang.name}</span>
                                    <span className="text-gray-500 text-xs">{lang.level}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
