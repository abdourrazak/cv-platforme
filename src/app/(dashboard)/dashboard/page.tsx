import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeIn } from "@/components/animations/FadeIn"
import { StaggerChildren } from "@/components/animations/StaggerChildren"
import { Plus, FileText, MoreVertical, Calendar } from "lucide-react"

export default function DashboardPage() {
    // Mock data pour l'exemple
    const cvs = [
        { id: '1', title: 'CV Développeur Fullstack', updatedAt: 'Il y a 2 heures', template: 'Modern' },
        { id: '2', title: 'CV Chef de Projet', updatedAt: 'Il y a 2 jours', template: 'Professional' },
        { id: '3', title: 'Candidature Stage', updatedAt: 'Il y a 1 semaine', template: 'Minimal' },
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Mes CVs</h1>
                    <p className="text-muted-foreground mt-1">
                        Gérez et éditez vos différents CVs
                    </p>
                </div>
                <Button asChild>
                    <Link href="/templates">
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau CV
                    </Link>
                </Button>
            </div>

            <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Carte "Créer un nouveau CV" */}
                <Link href="/templates" className="group">
                    <Card className="h-full border-dashed border-2 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer flex flex-col items-center justify-center p-8 min-h-[250px]">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Plus className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg">Créer un nouveau CV</h3>
                        <p className="text-sm text-muted-foreground text-center mt-2">
                            Commencez avec un de nos templates professionnels
                        </p>
                    </Card>
                </Link>

                {/* Liste des CVs existants */}
                {cvs.map((cv) => (
                    <Card key={cv.id} className="flex flex-col hover:shadow-md transition-shadow">
                        <CardHeader className="flex-row items-start justify-between space-y-0 pb-2">
                            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                                <FileText className="w-5 h-5" />
                            </div>
                            <Button variant="ghost" size="icon" className="-mr-2">
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="flex-1 pt-4">
                            <CardTitle className="text-lg mb-2 line-clamp-1">{cv.title}</CardTitle>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                                Template {cv.template}
                            </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4 text-xs text-muted-foreground flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            Modifié {cv.updatedAt}
                        </CardFooter>
                    </Card>
                ))}
            </StaggerChildren>
        </div>
    )
}
