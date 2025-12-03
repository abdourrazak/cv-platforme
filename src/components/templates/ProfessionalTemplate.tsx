import React from 'react'
import { CVData } from '@/types/cv'

interface TemplateProps {
    data: CVData
    colorScheme?: string
    fontFamily?: string
}

export function ProfessionalTemplate({ data, fontFamily = 'serif' }: TemplateProps) {
    const { personalInfo, summary, experiences, education, skills, languages } = data

    return (
        <div className={`w-full h-full min-h-[297mm] bg-white text-black p-12 font-${fontFamily}`} id="cv-preview">
            {/* Header Centré */}
            <header className="text-center border-b border-black pb-4 mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-wide mb-2">
                    {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                <div className="flex flex-wrap justify-center gap-x-4 text-sm">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {(personalInfo.city || personalInfo.country) && (
                        <span>• {[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                    )}
                    {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
                    {personalInfo.website && <span>• {personalInfo.website}</span>}
                </div>
            </header>

            <div className="space-y-6">
                {/* Summary */}
                {summary && (
                    <section>
                        <h3 className="text-sm font-bold uppercase border-b border-black mb-2">Profil</h3>
                        <p className="text-sm text-justify leading-relaxed">{summary}</p>
                    </section>
                )}

                {/* Experience */}
                {experiences.length > 0 && (
                    <section>
                        <h3 className="text-sm font-bold uppercase border-b border-black mb-3">Expérience Professionnelle</h3>
                        <div className="space-y-4">
                            {experiences.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="font-bold text-base">{exp.company}</h4>
                                        <span className="text-sm italic">
                                            {exp.location}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="italic font-medium">{exp.position}</span>
                                        <span className="text-sm">
                                            {exp.startDate} – {exp.current ? 'Présent' : exp.endDate}
                                        </span>
                                    </div>
                                    <p className="text-sm text-justify leading-snug whitespace-pre-line mt-1">
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
                        <h3 className="text-sm font-bold uppercase border-b border-black mb-3">Formation</h3>
                        <div className="space-y-3">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="font-bold">{edu.institution}</h4>
                                        <span className="text-sm">
                                            {edu.startDate} – {edu.endDate}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                        <span className="italic">{edu.degree}</span>
                                        <span className="text-sm italic">{edu.location}</span>
                                    </div>
                                    {edu.description && (
                                        <p className="text-sm mt-1">{edu.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills & Languages */}
                {(skills.length > 0 || languages.length > 0) && (
                    <section>
                        <h3 className="text-sm font-bold uppercase border-b border-black mb-3">Compétences & Langues</h3>
                        <div className="text-sm space-y-1">
                            {skills.length > 0 && (
                                <div>
                                    <span className="font-bold">Compétences : </span>
                                    {skills.map(s => s.name).join(' • ')}
                                </div>
                            )}
                            {languages.length > 0 && (
                                <div>
                                    <span className="font-bold">Langues : </span>
                                    {languages.map(l => `${l.name} (${l.level})`).join(' • ')}
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
