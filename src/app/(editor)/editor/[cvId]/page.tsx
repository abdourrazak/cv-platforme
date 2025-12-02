"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Download, Share2, LayoutTemplate } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCV } from "@/context/CVContext"
import { PersonalInfoEditor } from "@/components/editor/cv-sections/PersonalInfoEditor"
import { ModernTemplate } from "@/components/templates/ModernTemplate"
import { MinimalistTemplate } from "@/components/templates/MinimalistTemplate"
import { DesignEditor } from "@/components/editor/DesignEditor"

import { SummaryEditor } from "@/components/editor/cv-sections/SummaryEditor"
import { ExperienceEditor } from "@/components/editor/cv-sections/ExperienceEditor"
import { EducationEditor } from "@/components/editor/cv-sections/EducationEditor"
import { SkillsEditor } from "@/components/editor/cv-sections/SkillsEditor"
import { LanguagesEditor } from "@/components/editor/cv-sections/LanguagesEditor"

import { downloadPDF } from "@/lib/pdf"

export default function EditorPage({ params }: { params: { cvId: string } }) {
    const [activeTab, setActiveTab] = useState("content")
    const { cv } = useCV()

    const handleDownload = async () => {
        await downloadPDF("cv-preview", `${cv.data.personalInfo.firstName}-${cv.data.personalInfo.lastName}-CV.pdf`)
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
                        />
                        <span className="text-xs text-muted-foreground">
                            Dernière modification : {new Date().toLocaleTimeString()}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hidden md:flex">
                        <LayoutTemplate className="w-4 h-4 mr-2" />
                        Changer de modèle
                    </Button>
                    <div className="h-6 w-px bg-border mx-2 hidden md:block"></div>
                    <Button variant="ghost" size="icon" title="Sauvegarder">
                        <Save className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Partager
                    </Button>
                    <Button size="sm" onClick={handleDownload}>
                        <Download className="w-4 h-4 mr-2" />
                        Exporter PDF
                    </Button>
                </div>
            </header>

            {/* Zone principale */}
            <div className="flex-1 flex overflow-hidden">
                {/* Panneau latéral gauche (Édition) */}
                <aside className="w-full md:w-[450px] border-r bg-card flex flex-col overflow-hidden">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                        <div className="px-4 pt-4 pb-2 border-b">
                            <TabsList className="w-full grid grid-cols-3">
                                <TabsTrigger value="content">Contenu</TabsTrigger>
                                <TabsTrigger value="design">Design</TabsTrigger>
                                <TabsTrigger value="settings">Paramètres</TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50">
                            <TabsContent value="content" className="mt-0 space-y-8 pb-20">
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

                            <TabsContent value="design" className="mt-0">
                                <DesignEditor />
                            </TabsContent>

                            <TabsContent value="settings" className="mt-0">
                                <div className="text-center py-10 text-muted-foreground">
                                    Paramètres du CV à venir...
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </aside>

                {/* Zone de prévisualisation (Droite) */}
                <main className="flex-1 bg-muted/30 overflow-y-auto p-8 flex justify-center">
                    <div className="w-[210mm] min-h-[297mm] bg-white shadow-xl rounded-sm origin-top transform scale-[0.6] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 transition-transform duration-200">
                        {cv.templateId === 'minimalist' ? (
                            <MinimalistTemplate
                                data={cv.data}
                                colorScheme={cv.colorScheme}
                                fontFamily={cv.fontFamily}
                            />
                        ) : (
                            <ModernTemplate
                                data={cv.data}
                                colorScheme={cv.colorScheme}
                                fontFamily={cv.fontFamily}
                            />
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}
