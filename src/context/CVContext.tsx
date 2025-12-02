"use client"

import React, { createContext, useContext, useReducer, useEffect } from 'react'
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
    | { type: 'ADD_ITEM'; payload: { section: CVSection; item: any } }
    | { type: 'UPDATE_ITEM'; payload: { section: CVSection; id: string; item: any } }
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
        // ... autres cas à implémenter pour une gestion complète
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
    const [cv, dispatch] = useReducer(cvReducer, initialData || initialCV)

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
