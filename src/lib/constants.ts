import { ColorScheme, FontPairing } from "@/types/template"

// Palettes de couleurs prédéfinies
export const COLOR_SCHEMES: ColorScheme[] = [
    {
        id: 'purple-blue',
        name: 'Violet & Bleu',
        primary: '#8B5CF6',
        secondary: '#0EA5E9',
        accent: '#EC4899',
        text: '#1E293B',
        background: '#FFFFFF',
    },
    {
        id: 'blue-teal',
        name: 'Bleu & Turquoise',
        primary: '#3B82F6',
        secondary: '#14B8A6',
        accent: '#F59E0B',
        text: '#1E293B',
        background: '#FFFFFF',
    },
    {
        id: 'green-emerald',
        name: 'Vert & Émeraude',
        primary: '#10B981',
        secondary: '#059669',
        accent: '#8B5CF6',
        text: '#1E293B',
        background: '#FFFFFF',
    },
    {
        id: 'slate-gray',
        name: 'Ardoise & Gris',
        primary: '#475569',
        secondary: '#64748B',
        accent: '#0EA5E9',
        text: '#1E293B',
        background: '#FFFFFF',
    },
    {
        id: 'rose-pink',
        name: 'Rose & Pink',
        primary: '#F43F5E',
        secondary: '#EC4899',
        accent: '#8B5CF6',
        text: '#1E293B',
        background: '#FFFFFF',
    },
    {
        id: 'orange-amber',
        name: 'Orange & Ambre',
        primary: '#F97316',
        secondary: '#F59E0B',
        accent: '#EF4444',
        text: '#1E293B',
        background: '#FFFFFF',
    },
]

// Paires de polices
export const FONT_PAIRINGS: FontPairing[] = [
    {
        id: 'inter-inter',
        name: 'Moderne (Inter)',
        heading: 'Inter',
        body: 'Inter',
    },
    {
        id: 'poppins-opensans',
        name: 'Dynamique (Poppins + Open Sans)',
        heading: 'Poppins',
        body: 'Open Sans',
    },
    {
        id: 'playfair-lato',
        name: 'Élégant (Playfair + Lato)',
        heading: 'Playfair Display',
        body: 'Lato',
    },
    {
        id: 'merriweather-opensans',
        name: 'Classique (Merriweather + Open Sans)',
        heading: 'Merriweather',
        body: 'Open Sans',
    },
    {
        id: 'montserrat-roboto',
        name: 'Professionnel (Montserrat + Roboto)',
        heading: 'Montserrat',
        body: 'Roboto',
    },
]

// Niveaux de compétences
export const SKILL_LEVELS = [
    { value: 'beginner', label: 'Débutant' },
    { value: 'intermediate', label: 'Intermédiaire' },
    { value: 'advanced', label: 'Avancé' },
    { value: 'expert', label: 'Expert' },
] as const

// Niveaux de langues (CECRL)
export const LANGUAGE_LEVELS = [
    { value: 'A1', label: 'A1 - Débutant' },
    { value: 'A2', label: 'A2 - Élémentaire' },
    { value: 'B1', label: 'B1 - Intermédiaire' },
    { value: 'B2', label: 'B2 - Intermédiaire avancé' },
    { value: 'C1', label: 'C1 - Avancé' },
    { value: 'C2', label: 'C2 - Maîtrise' },
    { value: 'Native', label: 'Langue maternelle' },
] as const

// Sections du CV
export const CV_SECTIONS = [
    { id: 'personalInfo', label: 'Informations personnelles', icon: '👤' },
    { id: 'summary', label: 'Accroche professionnelle', icon: '📝' },
    { id: 'experiences', label: 'Expériences professionnelles', icon: '💼' },
    { id: 'education', label: 'Formation', icon: '🎓' },
    { id: 'skills', label: 'Compétences', icon: '⚡' },
    { id: 'languages', label: 'Langues', icon: '🌍' },
    { id: 'projects', label: 'Projets', icon: '🚀' },
    { id: 'interests', label: "Centres d'intérêt", icon: '🎨' },
    { id: 'customSections', label: 'Sections personnalisées', icon: '➕' },
] as const

// Ordre par défaut des sections
export const DEFAULT_SECTION_ORDER = [
    'personalInfo',
    'summary',
    'experiences',
    'education',
    'skills',
    'languages',
    'projects',
    'interests',
]
