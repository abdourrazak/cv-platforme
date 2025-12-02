"use client"

import { useState } from "react"
import { useCV } from "@/context/CVContext"
import { Experience } from "@/types/cv"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, ChevronDown, ChevronUp, Briefcase } from "lucide-react"
import { nanoid } from "nanoid"

export function ExperienceEditor() {
    const { cv, dispatch } = useCV()
    const { experiences } = cv.data
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const handleAdd = () => {
        const newExperience: Experience = {
            id: nanoid(),
            position: "Nouveau poste",
            company: "Entreprise",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
            highlights: [],
        }
        dispatch({
            type: "ADD_ITEM",
            payload: { section: "experiences", item: newExperience },
        })
        setExpandedId(newExperience.id)
    }

    const handleRemove = (id: string) => {
        dispatch({
            type: "REMOVE_ITEM",
            payload: { section: "experiences", id },
        })
    }

    const handleChange = (id: string, field: keyof Experience, value: any) => {
        const experience = experiences.find((e) => e.id === id)
        if (experience) {
            dispatch({
                type: "UPDATE_ITEM",
                payload: {
                    section: "experiences",
                    id,
                    item: { [field]: value },
                },
            })
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Expérience Professionnelle</h3>
                <Button onClick={handleAdd} size="sm" className="gap-2">
                    <Plus className="w-4 h-4" /> Ajouter
                </Button>
            </div>

            <div className="space-y-4">
                {experiences.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                        <Briefcase className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>Aucune expérience ajoutée</p>
                    </div>
                )}

                {experiences.map((exp) => (
                    <Card key={exp.id} className="overflow-hidden">
                        <div
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                        >
                            <div className="font-medium">
                                {exp.position} <span className="text-muted-foreground">chez</span> {exp.company}
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleRemove(exp.id)
                                    }}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                                {expandedId === exp.id ? (
                                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                )}
                            </div>
                        </div>

                        {expandedId === exp.id && (
                            <CardContent className="border-t bg-muted/10 p-4 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Poste</Label>
                                        <Input
                                            value={exp.position}
                                            onChange={(e) => handleChange(exp.id, "position", e.target.value)}
                                            placeholder="Ex: Développeur Frontend"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Entreprise</Label>
                                        <Input
                                            value={exp.company}
                                            onChange={(e) => handleChange(exp.id, "company", e.target.value)}
                                            placeholder="Ex: Google"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Date de début</Label>
                                        <Input
                                            value={exp.startDate}
                                            onChange={(e) => handleChange(exp.id, "startDate", e.target.value)}
                                            placeholder="Ex: Jan 2020"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Date de fin</Label>
                                        <Input
                                            value={exp.endDate}
                                            onChange={(e) => handleChange(exp.id, "endDate", e.target.value)}
                                            placeholder="Ex: Présent"
                                            disabled={exp.current}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id={`current-${exp.id}`}
                                        checked={exp.current}
                                        onChange={(e) => handleChange(exp.id, "current", e.target.checked)}
                                        className="rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <Label htmlFor={`current-${exp.id}`} className="cursor-pointer">
                                        Je travaille actuellement ici
                                    </Label>
                                </div>

                                <div className="space-y-2">
                                    <Label>Localisation</Label>
                                    <Input
                                        value={exp.location}
                                        onChange={(e) => handleChange(exp.id, "location", e.target.value)}
                                        placeholder="Ex: Paris, France"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Textarea
                                        value={exp.description}
                                        onChange={(e) => handleChange(exp.id, "description", e.target.value)}
                                        placeholder="Décrivez vos responsabilités et réalisations..."
                                        className="min-h-[100px]"
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
