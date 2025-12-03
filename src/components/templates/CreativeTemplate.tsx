import React from 'react'
import { CVData } from '@/types/cv'
import { MapPin, Mail, Phone, Globe, Linkedin, ExternalLink } from 'lucide-react'

interface TemplateProps {
    data: CVData
    colorScheme?: string
    fontFamily?: string
}

export function CreativeTemplate({ data, colorScheme = 'purple', fontFamily = 'poppins' }: TemplateProps) {
    const { personalInfo, summary, experiences, education, skills, languages } = data

    // Mapping des couleurs pour Tailwind
    const colors = {
        blue: {
            bg: 'bg-blue-600',
            text: 'text-blue-600',
            light: 'bg-blue-50',
            border: 'border-blue-600'
        },
        purple: {
            bg: 'bg-purple-600',
            text: 'text-purple-600',
            light: 'bg-purple-50',
            border: 'border-purple-600'
        },
        green: {
            bg: 'bg-emerald-600',
            text: 'text-emerald-600',
            light: 'bg-emerald-50',
            border: 'border-emerald-600'
        },
        red: {
            bg: 'bg-rose-600',
            text: 'text-rose-600',
            light: 'bg-rose-50',
            border: 'border-rose-600'
        },
        black: {
            bg: 'bg-slate-900',
            text: 'text-slate-900',
            light: 'bg-slate-50',
            border: 'border-slate-900'
        },
    }

    const theme = colors[colorScheme as keyof typeof colors] || colors.purple

    return (
        <div className={`w-full h-full min-h-[297mm] bg-white flex shadow-lg overflow-hidden font-${fontFamily}`} id="cv-preview">
            {/* Sidebar Gauche */}
            <aside className={`${theme.bg} text-white w-[35%] p-8 flex flex-col gap-8`}>
                {/* Photo / Initiales */}
                <div className="flex justify-center mb-4">
                    <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30 backdrop-blur-sm">
                        <span className="text-4xl font-bold text-white">
                            {personalInfo.firstName[0]}{personalInfo.lastName[0]}
                        </span>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 text-sm">
                    <h3 className="text-white/90 font-bold uppercase tracking-wider border-b border-white/20 pb-2 mb-4">Contact</h3>

                    {personalInfo.email && (
                        <div className="flex items-center gap-3 text-white/90">
                            <div className="p-1.5 bg-white/10 rounded-md">
                                <Mail size={14} />
                            </div>
                            <span className="break-all">{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-center gap-3 text-white/90">
                            <div className="p-1.5 bg-white/10 rounded-md">
                                <Phone size={14} />
                            </div>
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {(personalInfo.city || personalInfo.country) && (
                        <div className="flex items-center gap-3 text-white/90">
                            <div className="p-1.5 bg-white/10 rounded-md">
                                <MapPin size={14} />
                            </div>
                            <span>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                        </div>
                    )}
                    {personalInfo.website && (
                        <div className="flex items-center gap-3 text-white/90">
                            <div className="p-1.5 bg-white/10 rounded-md">
                                <Globe size={14} />
                            </div>
                            <span className="truncate">{personalInfo.website}</span>
                        </div>
                    )}
                    {personalInfo.linkedin && (
                        <div className="flex items-center gap-3 text-white/90">
                            <div className="p-1.5 bg-white/10 rounded-md">
                                <Linkedin size={14} />
                            </div>
                            <span className="truncate">{personalInfo.linkedin}</span>
                        </div>
                    )}
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-white/90 font-bold uppercase tracking-wider border-b border-white/20 pb-2 mb-4">Compétences</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <span
                                    key={skill.id}
                                    className="bg-white/10 px-3 py-1.5 rounded text-sm text-white/90 font-medium"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {languages.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-white/90 font-bold uppercase tracking-wider border-b border-white/20 pb-2 mb-4">Langues</h3>
                        <div className="space-y-3">
                            {languages.map((lang) => (
                                <div key={lang.id}>
                                    <div className="flex justify-between text-sm mb-1 text-white/90">
                                        <span className="font-medium">{lang.name}</span>
                                        <span className="opacity-75">{lang.level}</span>
                                    </div>
                                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-white/80 rounded-full"
                                            style={{
                                                width: lang.level.includes('Nat') ? '100%' :
                                                    lang.level.includes('Avancé') ? '80%' :
                                                        lang.level.includes('Inter') ? '60%' : '40%'
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 space-y-8">
                {/* Header Name */}
                <div className="space-y-2">
                    <h1 className={`text-5xl font-bold ${theme.text} uppercase tracking-tight leading-none`}>
                        {personalInfo.firstName}<br />
                        <span className="text-slate-800">{personalInfo.lastName}</span>
                    </h1>
                    <h2 className="text-xl font-medium text-slate-500 tracking-widest uppercase">
                        {personalInfo.title}
                    </h2>
                </div>

                {/* Summary */}
                {summary && (
                    <div className="relative pl-6 border-l-4 border-slate-200">
                        <p className="text-slate-600 leading-relaxed italic">
                            "{summary}"
                        </p>
                    </div>
                )}

                {/* Experience */}
                {experiences.length > 0 && (
                    <section className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${theme.bg} text-white`}>
                                <ExternalLink size={20} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 uppercase tracking-wide">Expérience</h3>
                        </div>

                        <div className="space-y-8 relative before:absolute before:left-[9px] before:top-2 before:h-full before:w-[2px] before:bg-slate-100">
                            {experiences.map((exp) => (
                                <div key={exp.id} className="relative pl-8">
                                    {/* Timeline dot */}
                                    <div className={`absolute left-0 top-1.5 w-5 h-5 rounded-full border-4 border-white ${theme.bg} shadow-sm`} />

                                    <div className="space-y-1">
                                        <h4 className="text-lg font-bold text-slate-800">{exp.position}</h4>
                                        <div className={`text-sm font-semibold ${theme.text}`}>
                                            {exp.company} • {exp.location}
                                        </div>
                                        <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                                            {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section className="space-y-6 pt-4">
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${theme.bg} text-white`}>
                                <ExternalLink size={20} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 uppercase tracking-wide">Formation</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {education.map((edu) => (
                                <div key={edu.id} className={`p-4 rounded-xl ${theme.light} border border-slate-100`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                                            <div className={`text-sm font-medium ${theme.text}`}>{edu.institution}</div>
                                        </div>
                                        <span className="text-xs font-bold bg-white px-2 py-1 rounded text-slate-500 shadow-sm">
                                            {edu.startDate} - {edu.endDate}
                                        </span>
                                    </div>
                                    {edu.description && (
                                        <p className="text-sm text-slate-600 mt-2">{edu.description}</p>
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
