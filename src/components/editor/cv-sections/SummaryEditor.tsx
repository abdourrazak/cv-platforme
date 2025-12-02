"use client"

import { useCV } from "@/context/CVContext"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SummaryEditor() {
    const { cv, dispatch } = useCV()
    const { summary } = cv.data

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({
            type: 'UPDATE_SUMMARY',
            payload: e.target.value
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profil Professionnel</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Label htmlFor="summary">Résumé</Label>
                    <Textarea
                        id="summary"
                        value={summary}
                        onChange={handleChange}
                        placeholder="Décrivez brièvement votre parcours, vos objectifs et vos points forts..."
                        className="min-h-[150px]"
                    />
                </div>
            </CardContent>
        </Card>
    )
}
