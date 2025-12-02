// Types pour les données du CV

export interface PersonalInfo {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    photo?: string;
    linkedin?: string;
    website?: string;
    github?: string;
}

export interface Experience {
    id: string;
    position: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    highlights: string[];
}

export interface Education {
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    gpa?: string;
}

export interface Skill {
    id: string;
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    category?: string;
}

export interface Language {
    id: string;
    name: string;
    level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
}

export interface Project {
    id: string;
    name: string;
    description: string;
    url?: string;
    technologies: string[];
    startDate?: string;
    endDate?: string;
}

export interface CustomSection {
    id: string;
    title: string;
    content: string;
    items?: Array<{
        id: string;
        title: string;
        description: string;
    }>;
}

export interface CVData {
    personalInfo: PersonalInfo;
    summary: string;
    experiences: Experience[];
    education: Education[];
    skills: Skill[];
    languages: Language[];
    projects: Project[];
    interests: string[];
    customSections: CustomSection[];
    sectionOrder: string[];
}

export interface CV {
    id: string;
    userId: string;
    title: string;
    templateId: string;
    colorScheme: string;
    fontFamily: string;
    createdAt: Date;
    updatedAt: Date;
    shareId?: string;
    data: CVData;
}

export type CVSection =
    | 'personalInfo'
    | 'summary'
    | 'experiences'
    | 'education'
    | 'skills'
    | 'languages'
    | 'projects'
    | 'interests'
    | 'customSections';
