"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Download, Share2, LayoutTemplate } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCV } from "@/context/CVContext"
import { PersonalInfoEditor } from "@/components/editor/cv-sections/PersonalInfoEditor"
import { ModernTemplate } from "@/components/templates/ModernTemplate"
import { MinimalistTemplate } from "@/components/templates/MinimalistTemplate"
import { CreativeTemplate } from "@/components/templates/CreativeTemplate"
import { ExecutiveTemplate } from "@/components/templates/ExecutiveTemplate"
import { ProfessionalTemplate } from "@/components/templates/ProfessionalTemplate"
import { DesignEditor } from "@/components/editor/DesignEditor"
import { SummaryEditor } from "@/components/editor/cv-sections/SummaryEditor"
import { ExperienceEditor } from "@/components/editor/cv-sections/ExperienceEditor"
import { EducationEditor } from "@/components/editor/cv-sections/EducationEditor"
import { SkillsEditor } from "@/components/editor/cv-sections/SkillsEditor"
import { LanguagesEditor } from "@/components/editor/cv-sections/LanguagesEditor"
import { ShareDialog } from "@/components/editor/ShareDialog"
import { downloadPDF } from "@/lib/pdf"

export default function EditorPage({ params }: { params: { cvId: string } }) {
    const [activeTab, setActiveTab] = useState("content")
    const [saving, setSaving] = useState(false)
    const [lastSaved, setLastSaved] = useState<Date | null>(null)
    const { cv, dispatch } = useCV()
    const { data: session, status } = useSession()
    const router = useRouter()

    // Charger le CV depuis la base de données
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin")
            return
        }

        if (status === "authenticated" && params.cvId) {
            loadCV()
        }
    }, [status, params.cvId])

    const loadCV = async () => {
        try {
            const response = await fetch(`/api/cvs/${params.cvId}`)
            if (response.ok) {
                const cvData = await response.json()
                dispatch({
                    type: 'SET_CV',
                    payload: cvData
                })
            } else if (response.status === 404) {
                router.push("/dashboard")
            }
        } catch (error) {
            console.error("Erreur lors du chargement du CV:", error)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const response = await fetch(`/api/cvs/${params.cvId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cv)
            })

            if (response.ok) {
                setLastSaved(new Date())
            }
        } catch (error) {
            console.error("Erreur lors de la sauvegarde:", error)
        } finally {
            setSaving(false)
        }
    }

    const handleDownload = async () => {
        await downloadPDF("cv-preview", `${cv.data.personalInfo.firstName}-${cv.data.personalInfo.lastName}-CV.pdf`)
    }

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    const renderTemplate = () => {
        switch (cv.templateId) {
            case 'minimalist':
                return <MinimalistTemplate data={cv.data} colorScheme={cv.colorScheme} fontFamily={cv.fontFamily} />
            case 'creative':
                return <CreativeTemplate data={cv.data} colorScheme={cv.colorScheme} fontFamily={cv.fontFamily} />
            case 'executive':
                return <ExecutiveTemplate data={cv.data} colorScheme={cv.colorScheme} fontFamily={cv.fontFamily} />
            case 'professional':
                return <ProfessionalTemplate data={cv.data} colorScheme={cv.colorScheme} fontFamily={cv.fontFamily} />
            case 'modern':
            default:
                return <ModernTemplate data={cv.data} colorScheme={cv.colorScheme} fontFamily={cv.fontFamily} />
        }
    }

    return (
        <div className="flex flex-col h-full">
            {/* Toolbar supérieure */}
            <header className="h-16 border-b flex items-center justify-between px-4 bg-card shrink-0 z-10">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                    </Button>
                    <div className="flex flex-col">
                        <input
                            type="text"
                            defaultValue={cv.title}
                            className="font-semibold bg-transparent border-none p-0 focus:ring-0 text-sm md:text-base"
                            onBlur={(e) => {
                                dispatch({
                                    type: 'UPDATE_METADATA',
                                    payload: { title: e.target.value }
                                })
                            }}
                        />
                        <span className="text-xs text-muted-foreground">
                            {lastSaved ? `Sauvegardé à ${lastSaved.toLocaleTimeString()}` : 'Non sauvegardé'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hidden md:flex" onClick={() => setActiveTab("design")}>
                        <LayoutTemplate className="w-4 h-4 mr-2" />
                        Changer de modèle
                    </Button>
                    <div className="h-6 w-px bg-border mx-2 hidden md:block"></div>
                    <Button
                        variant="ghost"
                        size="icon"
                        title="Sauvegarder"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        <Save className={`w-5 h-5 ${saving ? 'animate-pulse' : ''}`} />
                    </Button>
                    <ShareDialog cvId={params.cvId} currentShareId={cv.shareId} />
                    <Button size="sm" onClick={handleDownload}>
                        <Download className="w-4 h-4 mr-2" />
                        Exporter PDF
                    </Button>
                </div>
            </header>

            {/* Zone principale */}
            <div className="flex-1 flex overflow-hidden">
                {/* Panneau latéral gauche (Édition) */}
                <aside className="w-full md:w-[450px] border-r bg-card flex flex-col">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                        <div className="px-4 pt-4 pb-2 border-b shrink-0">
                            <TabsList className="w-full grid grid-cols-3">
                                <TabsTrigger value="content">Contenu</TabsTrigger>
                                <TabsTrigger value="design">Design</TabsTrigger>
                                <TabsTrigger value="settings">Paramètres</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="content" className="flex-1 overflow-y-auto p-4 bg-gray-50/50 m-0 space-y-8 pb-20">
                            <PersonalInfoEditor />
                            <SummaryEditor />
                            <div className="space-y-6">
                                <div className="border-t pt-6">
                                    <ExperienceEditor />
                                </div>
                                <div className="border-t pt-6">
                                    <EducationEditor />
                                </div>
                                <div className="border-t pt-6">
                                    <SkillsEditor />
                                </div>
                                <div className="border-t pt-6">
                                    <LanguagesEditor />
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="design" className="flex-1 overflow-y-auto p-4 bg-gray-50/50 m-0">
                            <DesignEditor />
                        </TabsContent>

                        <TabsContent value="settings" className="flex-1 overflow-y-auto p-4 bg-gray-50/50 m-0">
                            <div className="text-center py-10 text-muted-foreground">
                                Paramètres à venir...
                            </div>
                        </TabsContent>
                    </Tabs>
                </aside>

                {/* Zone de prévisualisation (Droite) */}
                <main className="flex-1 bg-muted/30 overflow-y-auto p-8 flex justify-center">
                    <div className="w-[210mm] min-h-[297mm] bg-white shadow-xl rounded-sm origin-top transform scale-[0.6] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 transition-transform duration-200">
                        {renderTemplate()}
                    </div>
                </main>
            </div>
        </div>
    )
}
