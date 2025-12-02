"use client"

import React, { createContext, useContext, useReducer } from 'react'
import { CV, CVData, CVSection } from '@/types/cv'
import { DEFAULT_SECTION_ORDER } from '@/lib/constants'

// État initial vide
const initialCVData: CVData = {
    personalInfo: {
        firstName: '',
        lastName: '',
        title: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
    },
    summary: '',
    experiences: [],
    education: [],
    skills: [],
    languages: [],
    projects: [],
    interests: [],
    customSections: [],
    sectionOrder: DEFAULT_SECTION_ORDER,
}

const initialCV: CV = {
    id: '',
    userId: '',
    title: 'Nouveau CV',
    templateId: 'modern',
    colorScheme: 'purple-blue',
    fontFamily: 'inter-inter',
    createdAt: new Date(),
    updatedAt: new Date(),
    data: initialCVData,
}

// Actions
type Action =
    | { type: 'SET_CV'; payload: CV }
    | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<CVData['personalInfo']> }
    | { type: 'UPDATE_SUMMARY'; payload: string }
    | { type: 'ADD_ITEM'; payload: { section: CVSection; item: unknown } }
    | { type: 'UPDATE_ITEM'; payload: { section: CVSection; id: string; item: unknown } }
    | { type: 'REMOVE_ITEM'; payload: { section: CVSection; id: string } }
    | { type: 'REORDER_SECTIONS'; payload: string[] }
    | { type: 'UPDATE_METADATA'; payload: Partial<Omit<CV, 'data'>> }

// Reducer
function cvReducer(state: CV, action: Action): CV {
    switch (action.type) {
        case 'SET_CV':
            return action.payload
        case 'UPDATE_PERSONAL_INFO':
            return {
                ...state,
                data: {
                    ...state.data,
                    personalInfo: { ...state.data.personalInfo, ...action.payload },
                },
                updatedAt: new Date(),
            }
        case 'UPDATE_SUMMARY':
            return {
                ...state,
                data: { ...state.data, summary: action.payload },
                updatedAt: new Date(),
            }
        case 'ADD_ITEM': {
            const { section, item } = action.payload
            return {
                ...state,
                data: {
                    ...state.data,
                    [section]: [...(state.data[section as keyof CVData] as any[]), item],
                },
                updatedAt: new Date(),
            }
        }
        case 'UPDATE_ITEM': {
            const { section, id, item } = action.payload
            return {
                ...state,
                data: {
                    ...state.data,
                    [section]: (state.data[section as keyof CVData] as any[]).map((i) =>
                        i.id === id ? { ...i, ...(item as any) } : i
                    ),
                },
                updatedAt: new Date(),
            }
        }
        case 'REMOVE_ITEM': {
            const { section, id } = action.payload
            return {
                ...state,
                data: {
                    ...state.data,
                    [section]: (state.data[section as keyof CVData] as any[]).filter(
                        (i) => i.id !== id
                    ),
                },
                updatedAt: new Date(),
            }
        }
        case 'REORDER_SECTIONS':
            return {
                ...state,
                data: { ...state.data, sectionOrder: action.payload },
                updatedAt: new Date(),
            }
        case 'UPDATE_METADATA':
            return {
                ...state,
                ...action.payload,
                updatedAt: new Date(),
            }
        default:
            return state
    }
}

// Context
const CVContext = createContext<{
    cv: CV
    dispatch: React.Dispatch<Action>
} | null>(null)

export function CVProvider({ children, initialData }: { children: React.ReactNode; initialData?: CV }) {
    // Charger depuis localStorage au démarrage
    const getInitialState = (): CV => {
        if (typeof window === 'undefined') return initialData || initialCV

        try {
            const savedCV = localStorage.getItem('current-cv')
            if (savedCV) {
                const parsed = JSON.parse(savedCV)
                // Reconvertir les dates
                return {
                    ...parsed,
                    createdAt: new Date(parsed.createdAt),
                    updatedAt: new Date(parsed.updatedAt),
                }
            }
        } catch (error) {
            console.error('Error loading CV from localStorage:', error)
        }

        return initialData || initialCV
    }

    const [cv, dispatch] = useReducer(cvReducer, null, getInitialState)

    // Sauvegarder automatiquement dans localStorage à chaque modification
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('current-cv', JSON.stringify(cv))
            } catch (error) {
                console.error('Error saving CV to localStorage:', error)
            }
        }
    }, [cv])

    return (
        <CVContext.Provider value={{ cv, dispatch }}>
            {children}
        </CVContext.Provider>
    )
}

export function useCV() {
    const context = useContext(CVContext)
    if (!context) {
        throw new Error('useCV must be used within a CVProvider')
    }
    return context
}
