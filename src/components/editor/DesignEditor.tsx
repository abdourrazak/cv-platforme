"use client"

import { useCV } from "@/context/CVContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"

const TEMPLATES = [
    {
        id: 'modern',
        name: 'Premium Modern',
        description: 'Design élégant avec timeline visuelle',
        preview: '/templates/modern-preview.png'
    },
    {
        id: 'creative',
        name: 'Creative Studio',
        description: 'Sidebar gradient premium',
        preview: '/templates/creative-preview.png'
    },
    {
        id: 'executive',
        name: 'Executive Pro',
        description: 'Ultra-professionnel pour cadres',
        preview: '/templates/executive-preview.png'
    },
    {
        id: 'minimalist',
        name: 'Minimal Elegant',
        description: 'Minimalisme raffiné',
        preview: '/templates/minimalist-preview.png'
    },
    {
        id: 'professional',
        name: 'Corporate Elite',
        description: 'Design corporate haut de gamme',
        preview: '/templates/professional-preview.png'
    }
]

const COLOR_SCHEMES = [
    { value: 'blue', label: 'Bleu', color: 'bg-blue-600' },
    { value: 'purple', label: 'Violet', color: 'bg-purple-600' },
    { value: 'green', label: 'Vert', color: 'bg-green-600' },
    { value: 'red', label: 'Rouge', color: 'bg-red-600' },
    { value: 'black', label: 'Noir', color: 'bg-gray-900' },
]

export function DesignEditor() {
    const { cv, dispatch } = useCV()

    const handleTemplateChange = (templateId: string) => {
        dispatch({
            type: 'UPDATE_METADATA',
            payload: { templateId }
        })
    }

    const handleColorChange = (colorScheme: string) => {
        dispatch({
            type: 'UPDATE_METADATA',
            payload: { colorScheme }
        })
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Modèle de CV</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {TEMPLATES.map((template) => (
                        <div
                            key={template.id}
                            className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${cv.templateId === template.id
                                ? 'border-primary bg-primary/5'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                            onClick={() => handleTemplateChange(template.id)}
                        >
                            {cv.templateId === template.id && (
                                <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                            )}
                            <h4 className="font-semibold mb-1">{template.name}</h4>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Couleur d'accentuation</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-5 gap-3">
                        {COLOR_SCHEMES.map((scheme) => (
                            <button
                                key={scheme.value}
                                onClick={() => handleColorChange(scheme.value)}
                                className={`relative aspect-square rounded-lg ${scheme.color} transition-all ${cv.colorScheme === scheme.value
                                    ? 'ring-2 ring-offset-2 ring-primary scale-110'
                                    : 'hover:scale-105'
                                    }`}
                                title={scheme.label}
                            >
                                {cv.colorScheme === scheme.value && (
                                    <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />
                                )}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 text-center">
                        Couleur sélectionnée : {COLOR_SCHEMES.find(s => s.value === cv.colorScheme)?.label}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
