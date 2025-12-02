"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Download, Share2, LayoutTemplate } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EditorPage({ params }: { params: { cvId: string } }) {
    const [activeTab, setActiveTab] = useState("content")

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
                            defaultValue="Mon CV Professionnel"
                            className="font-semibold bg-transparent border-none p-0 focus:ring-0 text-sm md:text-base"
                        />
                        <span className="text-xs text-muted-foreground">Dernière sauvegarde : 10:42</span>
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
                    <Button size="sm">
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

                        <div className="flex-1 overflow-y-auto p-4">
                            <TabsContent value="content" className="mt-0 space-y-6">
                                <div className="text-center py-10 text-muted-foreground">
                                    Composants d'édition de contenu à venir...
                                </div>
                            </TabsContent>

                            <TabsContent value="design" className="mt-0">
                                <div className="text-center py-10 text-muted-foreground">
                                    Options de design à venir...
                                </div>
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
                    <div className="w-[210mm] min-h-[297mm] bg-white shadow-xl rounded-sm origin-top transform scale-[0.8] md:scale-100 transition-transform duration-200">
                        {/* Le rendu du CV se fera ici */}
                        <div className="p-12 text-center text-gray-400 mt-20">
                            Aperçu du CV en temps réel
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
