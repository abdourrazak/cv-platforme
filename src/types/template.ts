// Types pour les templates de CV

export interface TemplateConfig {
    id: string;
    name: string;
    description: string;
    category: 'modern' | 'minimal' | 'creative' | 'classic' | 'professional' | 'executive';
    thumbnail: string;
    isPremium: boolean;
    isPopular: boolean;
    colorSchemes: ColorScheme[];
    defaultColorScheme: string;
    fontPairings: FontPairing[];
    defaultFontPairing: string;
}

export interface ColorScheme {
    id: string;
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
}

export interface FontPairing {
    id: string;
    name: string;
    heading: string;
    body: string;
}

export const TEMPLATE_CATEGORIES = [
    { id: 'modern', label: 'Moderne' },
    { id: 'minimal', label: 'Minimaliste' },
    { id: 'creative', label: 'Créatif' },
    { id: 'classic', label: 'Classique' },
    { id: 'professional', label: 'Professionnel' },
    { id: 'executive', label: 'Executive' },
] as const;

export const DEFAULT_COLOR_SCHEMES: ColorScheme[] = [
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
];

export const DEFAULT_FONT_PAIRINGS: FontPairing[] = [
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
];
