"use client"

import { useState } from "react"
import { useCV } from "@/context/CVContext"
import { Education } from "@/types/cv"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, ChevronDown, ChevronUp, GraduationCap } from "lucide-react"
import { nanoid } from "nanoid"

export function EducationEditor() {
    const { cv, dispatch } = useCV()
    const { education } = cv.data
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const handleAdd = () => {
        const newEducation: Education = {
            id: nanoid(),
            degree: "Nouveau diplôme",
            institution: "École / Université",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
        }
        dispatch({
            type: "ADD_ITEM",
            payload: { section: "education", item: newEducation },
        })
        setExpandedId(newEducation.id)
    }

    const handleRemove = (id: string) => {
        dispatch({
            type: "REMOVE_ITEM",
            payload: { section: "education", id },
        })
    }

    const handleChange = (id: string, field: keyof Education, value: any) => {
        const edu = education.find((e) => e.id === id)
        if (edu) {
            dispatch({
                type: "UPDATE_ITEM",
                payload: {
                    section: "education",
                    id,
                    item: { [field]: value },
                },
            })
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Formation</h3>
                <Button onClick={handleAdd} size="sm" className="gap-2">
                    <Plus className="w-4 h-4" /> Ajouter
                </Button>
            </div>

            <div className="space-y-4">
                {education.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                        <GraduationCap className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>Aucune formation ajoutée</p>
                    </div>
                )}

                {education.map((edu) => (
                    <Card key={edu.id} className="overflow-hidden">
                        <div
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
                        >
                            <div className="font-medium">
                                {edu.degree} <span className="text-muted-foreground">à</span> {edu.institution}
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleRemove(edu.id)
                                    }}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                                {expandedId === edu.id ? (
                                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                )}
                            </div>
                        </div>

                        {expandedId === edu.id && (
                            <CardContent className="border-t bg-muted/10 p-4 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Diplôme</Label>
                                        <Input
                                            value={edu.degree}
                                            onChange={(e) => handleChange(edu.id, "degree", e.target.value)}
                                            placeholder="Ex: Master Informatique"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>École / Université</Label>
                                        <Input
                                            value={edu.institution}
                                            onChange={(e) => handleChange(edu.id, "institution", e.target.value)}
                                            placeholder="Ex: Université de Paris"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Date de début</Label>
                                        <Input
                                            value={edu.startDate}
                                            onChange={(e) => handleChange(edu.id, "startDate", e.target.value)}
                                            placeholder="Ex: Sept 2018"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Date de fin</Label>
                                        <Input
                                            value={edu.endDate}
                                            onChange={(e) => handleChange(edu.id, "endDate", e.target.value)}
                                            placeholder="Ex: Juin 2020"
                                            disabled={edu.current}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id={`edu-current-${edu.id}`}
                                        checked={edu.current}
                                        onChange={(e) => handleChange(edu.id, "current", e.target.checked)}
                                        className="rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <Label htmlFor={`edu-current-${edu.id}`} className="cursor-pointer">
                                        En cours
                                    </Label>
                                </div>

                                <div className="space-y-2">
                                    <Label>Localisation</Label>
                                    <Input
                                        value={edu.location}
                                        onChange={(e) => handleChange(edu.id, "location", e.target.value)}
                                        placeholder="Ex: Paris, France"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Description (Optionnel)</Label>
                                    <Textarea
                                        value={edu.description}
                                        onChange={(e) => handleChange(edu.id, "description", e.target.value)}
                                        placeholder="Détails sur la formation, mentions..."
                                        className="min-h-[80px]"
                                    />
                                </div>
                            </CardContent>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    )
}
