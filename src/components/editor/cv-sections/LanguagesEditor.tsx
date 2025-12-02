"use client"

import { useCV } from "@/context/CVContext"
import { Language } from "@/types/cv"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X, Languages } from "lucide-react"
import { nanoid } from "nanoid"
import { LANGUAGE_LEVELS } from "@/lib/constants"

export function LanguagesEditor() {
    const { cv, dispatch } = useCV()
    const { languages } = cv.data

    const handleAdd = () => {
        const newLanguage: Language = {
            id: nanoid(),
            name: "",
            level: "B2",
        }
        dispatch({
            type: "ADD_ITEM",
            payload: { section: "languages", item: newLanguage },
        })
    }

    const handleRemove = (id: string) => {
        dispatch({
            type: "REMOVE_ITEM",
            payload: { section: "languages", id },
        })
    }

    const handleChange = (id: string, field: keyof Language, value: any) => {
        const lang = languages.find((l) => l.id === id)
        if (lang) {
            dispatch({
                type: "UPDATE_ITEM",
                payload: {
                    section: "languages",
                    id,
                    item: { [field]: value },
                },
            })
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Langues</h3>
                <Button onClick={handleAdd} size="sm" className="gap-2">
                    <Plus className="w-4 h-4" /> Ajouter
                </Button>
            </div>

            {languages.length === 0 && (
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                    <Languages className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Aucune langue ajoutée</p>
                </div>
            )}

            <div className="grid gap-4">
                {languages.map((lang) => (
                    <div key={lang.id} className="flex items-center gap-2">
                        <div className="flex-1">
                            <Input
                                value={lang.name}
                                onChange={(e) => handleChange(lang.id, "name", e.target.value)}
                                placeholder="Ex: Anglais, Espagnol..."
                            />
                        </div>
                        <div className="w-1/3">
                            <select
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={lang.level}
                                onChange={(e) => handleChange(lang.id, "level", e.target.value)}
                            >
                                {LANGUAGE_LEVELS.map((level) => (
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
                            onClick={() => handleRemove(lang.id)}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}
