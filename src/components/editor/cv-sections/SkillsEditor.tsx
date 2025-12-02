"use client"

import { useCV } from "@/context/CVContext"
import { Skill } from "@/types/cv"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, X, Wrench } from "lucide-react"
import { nanoid } from "nanoid"
import { SKILL_LEVELS } from "@/lib/constants"

export function SkillsEditor() {
    const { cv, dispatch } = useCV()
    const { skills } = cv.data

    const handleAdd = () => {
        const newSkill: Skill = {
            id: nanoid(),
            name: "",
            level: "intermediate",
        }
        dispatch({
            type: "ADD_ITEM",
            payload: { section: "skills", item: newSkill },
        })
    }

    const handleRemove = (id: string) => {
        dispatch({
            type: "REMOVE_ITEM",
            payload: { section: "skills", id },
        })
    }

    const handleChange = (id: string, field: keyof Skill, value: any) => {
        const skill = skills.find((s) => s.id === id)
        if (skill) {
            dispatch({
                type: "UPDATE_ITEM",
                payload: {
                    section: "skills",
                    id,
                    item: { [field]: value },
                },
            })
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Compétences</h3>
                <Button onClick={handleAdd} size="sm" className="gap-2">
                    <Plus className="w-4 h-4" /> Ajouter
                </Button>
            </div>

            {skills.length === 0 && (
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                    <Wrench className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Aucune compétence ajoutée</p>
                </div>
            )}

            <div className="grid gap-4">
                {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-2">
                        <div className="flex-1">
                            <Input
                                value={skill.name}
                                onChange={(e) => handleChange(skill.id, "name", e.target.value)}
                                placeholder="Ex: React, Python..."
                            />
                        </div>
                        <div className="w-1/3">
                            <select
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={skill.level}
                                onChange={(e) => handleChange(skill.id, "level", e.target.value)}
                            >
                                {SKILL_LEVELS.map((level) => (
                                    <option key={level.value} value={level.value}>
                                        {level.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleRemove(skill.id)}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}
