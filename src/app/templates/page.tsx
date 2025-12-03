import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModernTemplate } from "@/components/templates/ModernTemplate"
import { MinimalistTemplate } from "@/components/templates/MinimalistTemplate"
import { CreativeTemplate } from "@/components/templates/CreativeTemplate"
import { ExecutiveTemplate } from "@/components/templates/ExecutiveTemplate"
import { ProfessionalTemplate } from "@/components/templates/ProfessionalTemplate"
import { ArrowLeft, Check } from "lucide-react"

// Données d'exemple professionnelles
const sampleData = {
    personalInfo: {
        firstName: "Sophie",
        lastName: "Martin",
        title: "Chef de Projet Digital Senior",
        email: "sophie.martin@email.com",
        phone: "+33 6 12 34 56 78",
        address: "15 Avenue des Champs-Élysées",
        city: "Paris",
        country: "France",
        linkedin: "linkedin.com/in/sophiemartin",
        website: "sophiemartin.fr"
    },
    summary: "Chef de projet digital passionnée avec plus de 8 ans d'expérience dans la gestion de projets web et mobile. Expertise en méthodologies agiles, coordination d'équipes multidisciplinaires et livraison de solutions innovantes. Capacité démontrée à transformer les objectifs business en succès techniques.",
    experiences: [
        {
            id: "1",
            position: "Chef de Projet Digital Senior",
            company: "Agence Digitale Innovante",
            location: "Paris, France",
            startDate: "Jan 2020",
            endDate: "",
            current: true,
            description: "• Pilotage de 15+ projets web et mobile pour des clients grands comptes\n• Management d'une équipe de 12 personnes (développeurs, designers, UX)\n• Mise en place de processus agiles (Scrum) augmentant la productivité de 40%\n• Budget annuel géré : 2M€",
            highlights: []
        },
        {
            id: "2",
            position: "Chef de Projet Web",
            company: "Studio Créatif Paris",
            location: "Paris, France",
            startDate: "Mar 2017",
            endDate: "Déc 2019",
            current: false,
            description: "• Gestion de projets e-commerce et sites institutionnels\n• Coordination avec les équipes techniques et créatives\n• Suivi budgétaire et reporting client\n• Réduction des délais de livraison de 25%",
            highlights: []
        }
    ],
    education: [
        {
            id: "1",
            degree: "Master Management de Projets Digitaux",
            institution: "ESSEC Business School",
            location: "Cergy, France",
            startDate: "2015",
            endDate: "2017",
            current: false,
            description: "Spécialisation en transformation digitale et gestion de projets innovants"
        },
        {
            id: "2",
            degree: "Licence Information-Communication",
            institution: "Université Paris-Sorbonne",
            location: "Paris, France",
            startDate: "2012",
            endDate: "2015",
            current: false,
            description: ""
        }
    ],
    skills: [
        { id: "1", name: "Gestion de Projet Agile", level: "expert" as const },
        { id: "2", name: "Scrum & Kanban", level: "expert" as const },
        { id: "3", name: "JIRA & Confluence", level: "advanced" as const },
        { id: "4", name: "UX/UI Design", level: "intermediate" as const },
        { id: "5", name: "Google Analytics", level: "advanced" as const },
        { id: "6", name: "SEO/SEM", level: "intermediate" as const }
    ],
    languages: [
        { id: "1", name: "Français", level: "Native" as const },
        { id: "2", name: "Anglais", level: "C1" as const },
        { id: "3", name: "Espagnol", level: "B1" as const }
    ],
    projects: [],
    interests: [],
    customSections: [],
    sectionOrder: ["personalInfo", "summary", "experiences", "education", "skills", "languages"]
}

const templates = [
    {
        id: "modern",
        name: "Moderne",
        description: "Design coloré et dynamique, idéal pour les profils créatifs et tech",
        component: ModernTemplate,
        color: "blue"
    },
    {
        id: "creative",
        name: "Créatif",
        description: "Sidebar colorée avec mise en page visuelle, parfait pour designers et marketeurs",
        component: CreativeTemplate,
        color: "purple"
    },
    {
        id: "executive",
        name: "Exécutif",
        description: "Design sobre et structuré pour cadres et managers",
        component: ExecutiveTemplate,
        color: "black"
    },
    {
        id: "minimalist",
        name: "Minimaliste",
        description: "Épuré et professionnel, compatible ATS",
        component: MinimalistTemplate,
        color: "green"
    },
    {
        id: "professional",
        name: "Professionnel",
        description: "Style académique classique (Harvard), idéal pour le juridique et la finance",
        component: ProfessionalTemplate,
        color: "black"
    }
]

export default function TemplatesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            {/* Header */}
            <header className="bg-white border-b shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/dashboard">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">Choisissez votre template</h1>
                            <p className="text-sm text-muted-foreground">
                                5 templates professionnels conçus pour vous démarquer
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Templates Grid */}
            <main className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {templates.map((template) => {
                        const TemplateComponent = template.component
                        return (
                            <div key={template.id} className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{template.name}</h2>
                                        <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                                    </div>
                                    <Button asChild>
                                        <Link href={`/dashboard?template=${template.id}`}>
                                            <Check className="w-4 h-4 mr-2" />
                                            Choisir
                                        </Link>
                                    </Button>
                                </div>

                                <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-gray-200 hover:border-primary transition-all cursor-pointer">
                                    <div className="transform scale-[0.5] origin-top-left w-[200%] h-[200%]">
                                        <div className="w-[210mm] min-h-[297mm]">
                                            <TemplateComponent
                                                data={sampleData}
                                                colorScheme={template.color}
                                                fontFamily="inter"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}
