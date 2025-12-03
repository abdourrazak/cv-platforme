"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StaggerChildren } from "@/components/animations/StaggerChildren"
import { Plus, FileText, MoreVertical, Calendar, Trash2, Edit, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

interface CV {
    id: string
    title: string
    templateId: string
    updatedAt: string
    createdAt: string
}

export default function DashboardPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [cvs, setCvs] = useState<CV[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin")
        }
    }, [status, router])

    useEffect(() => {
        if (status === "authenticated") {
            fetchCVs()
        }
    }, [status])

    const fetchCVs = async () => {
        try {
            const response = await fetch("/api/cvs")
            if (response.ok) {
                const data = await response.json()
                setCvs(data)
            }
        } catch (error) {
            console.error("Erreur lors du chargement des CVs:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce CV ?")) return

        try {
            const response = await fetch(`/api/cvs/${id}`, {
                method: "DELETE"
            })

            if (response.ok) {
                setCvs(cvs.filter(cv => cv.id !== id))
            }
        } catch (error) {
            console.error("Erreur lors de la suppression:", error)
        }
    }

    const createNewCV = async () => {
        try {
            const response = await fetch("/api/cvs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: "Nouveau CV",
                    templateId: "modern",
                    colorScheme: "blue",
                    fontFamily: "inter",
                    data: {
                        personalInfo: {
                            firstName: "",
                            lastName: "",
                            title: "",
                            email: session?.user?.email || "",
                            phone: "",
                            address: "",
                            city: "",
                            country: ""
                        },
                        summary: "",
                        experiences: [],
                        education: [],
                        skills: [],
                        languages: [],
                        projects: [],
                        interests: [],
                        customSections: [],
                        sectionOrder: ["personalInfo", "summary", "experiences", "education", "skills", "languages"]
                    }
                })
            })

            if (response.ok) {
                const newCV = await response.json()
                router.push(`/editor/${newCV.id}`)
            }
        } catch (error) {
            console.error("Erreur lors de la création du CV:", error)
        }
    }

    const formatDate = (date: string) => {
        const d = new Date(date)
        const now = new Date()
        const diff = now.getTime() - d.getTime()
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))

        if (hours < 1) return "À l'instant"
        if (hours < 24) return `Il y a ${hours}h`
        if (days < 7) return `Il y a ${days}j`
        return d.toLocaleDateString('fr-FR')
    }

    if (status === "loading" || loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Mes CVs</h1>
                    <p className="text-muted-foreground mt-1">
                        Bonjour {session?.user?.name} ! Gérez vos CVs professionnels
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => signOut()}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Déconnexion
                    </Button>
                    <Button onClick={createNewCV}>
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau CV
                    </Button>
                </div>
            </div>

            <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Carte "Créer un nouveau CV" */}
                <Card
                    onClick={createNewCV}
                    className="h-full border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer flex flex-col items-center justify-center p-8 min-h-[250px]"
                >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 hover:scale-110 transition-transform">
                        <Plus className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">Créer un nouveau CV</h3>
                    <p className="text-sm text-muted-foreground text-center mt-2">
                        Commencez avec un template professionnel
                    </p>
                </Card>

                {/* Liste des CVs existants */}
                {cvs.map((cv) => (
                    <Card key={cv.id} className="flex flex-col hover:shadow-md transition-shadow">
                        <CardHeader className="flex-row items-start justify-between space-y-0 pb-2">
                            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div className="flex gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => router.push(`/editor/${cv.id}`)}
                                >
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                    onClick={() => handleDelete(cv.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 pt-4 cursor-pointer" onClick={() => router.push(`/editor/${cv.id}`)}>
                            <CardTitle className="text-lg mb-2 line-clamp-1">{cv.title}</CardTitle>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                                Template {cv.templateId === 'modern' ? 'Moderne' : 'Minimaliste'}
                            </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4 text-xs text-muted-foreground flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            Modifié {formatDate(cv.updatedAt)}
                        </CardFooter>
                    </Card>
                ))}
            </StaggerChildren>

            {cvs.length === 0 && !loading && (
                <div className="text-center py-12 text-muted-foreground">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Aucun CV créé pour le moment</p>
                    <p className="text-sm mt-2">Cliquez sur "Nouveau CV" pour commencer</p>
                </div>
            )}
        </div>
    )
}
