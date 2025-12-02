import React from 'react'
import { CVData } from '@/types/cv'
import { MapPin, Mail, Phone, Globe, Linkedin } from 'lucide-react'

interface TemplateProps {
    data: CVData
    colorScheme?: string
    fontFamily?: string
}

export function ModernTemplate({ data, colorScheme = 'blue', fontFamily = 'inter' }: TemplateProps) {
    const { personalInfo, summary, experiences, education, skills, languages } = data

    // Mapping des couleurs pour Tailwind (simplifié pour l'exemple)
    const colors = {
        blue: 'text-blue-600',
        purple: 'text-purple-600',
        green: 'text-green-600',
        red: 'text-red-600',
        black: 'text-gray-900',
    }

    const bgColors = {
        blue: 'bg-blue-600',
        purple: 'bg-purple-600',
        green: 'bg-green-600',
        red: 'bg-red-600',
        black: 'bg-gray-900',
    }

    const primaryColor = colors[colorScheme as keyof typeof colors] || colors.blue
    const primaryBg = bgColors[colorScheme as keyof typeof bgColors] || bgColors.blue

    return (
        <div className="w-full h-full bg-white min-h-[297mm] p-8 shadow-lg text-gray-800" id="cv-preview">
            {/* Header */}
            <header className="border-b-2 border-gray-100 pb-8 mb-8">
                <h1 className={`text-4xl font-bold mb-2 uppercase tracking-tight ${primaryColor}`}>
                    {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                <h2 className="text-xl text-gray-600 font-medium mb-4">{personalInfo.title}</h2>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    {personalInfo.email && (
                        <div className="flex items-center gap-1">
                            <Mail size={14} />
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-center gap-1">
                            <Phone size={14} />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {(personalInfo.city || personalInfo.country) && (
                        <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                        </div>
                    )}
                    {personalInfo.website && (
                        <div className="flex items-center gap-1">
                            <Globe size={14} />
                            <span>{personalInfo.website}</span>
                        </div>
                    )}
                    {personalInfo.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin size={14} />
                            <span>{personalInfo.linkedin}</span>
                        </div>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="col-span-8 space-y-8">
                    {/* Summary */}
                    {summary && (
                        <section>
                            <h3 className={`text-lg font-bold uppercase mb-3 border-b pb-1 ${primaryColor}`}>Profil</h3>
                            <p className="text-sm leading-relaxed text-gray-600">{summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {experiences.length > 0 && (
                        <section>
                            <h3 className={`text-lg font-bold uppercase mb-4 border-b pb-1 ${primaryColor}`}>Expérience Professionnelle</h3>
                            <div className="space-y-6">
                                {experiences.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-gray-800">{exp.position}</h4>
                                            <span className="text-xs text-gray-500 font-medium">
                                                {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium text-gray-600 mb-2">
                                            {exp.company} {exp.location && `• ${exp.location}`}
                                        </div>
                                        <p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section>
                            <h3 className={`text-lg font-bold uppercase mb-4 border-b pb-1 ${primaryColor}`}>Formation</h3>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-gray-800">{edu.degree}</h4>
                                            <span className="text-xs text-gray-500 font-medium">
                                                {edu.startDate} - {edu.current ? 'Présent' : edu.endDate}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {edu.institution} {edu.location && `• ${edu.location}`}
                                        </div>
                                        {edu.description && (
                                            <p className="text-sm text-gray-500 mt-1">{edu.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="col-span-4 space-y-8">
                    {/* Skills */}
                    {skills.length > 0 && (
                        <section>
                            <h3 className={`text-lg font-bold uppercase mb-4 border-b pb-1 ${primaryColor}`}>Compétences</h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <span
                                        key={skill.id}
                                        className={`text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-700`}
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages.length > 0 && (
                        <section>
                            <h3 className={`text-lg font-bold uppercase mb-4 border-b pb-1 ${primaryColor}`}>Langues</h3>
                            <div className="space-y-2">
                                {languages.map((lang) => (
                                    <div key={lang.id} className="flex justify-between items-center text-sm">
                                        <span className="font-medium text-gray-700">{lang.name}</span>
                                        <span className="text-gray-500 text-xs">{lang.level}</span>
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
