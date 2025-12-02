"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Palette, Download, Zap } from "lucide-react"
import { FadeIn } from "@/components/animations/FadeIn"
import { StaggerChildren } from "@/components/animations/StaggerChildren"

export default function Home() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/dashboard")
        }
    }, [status, router])

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
            <FadeIn>
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6">
                            <FileText className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Créez votre CV professionnel
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Des templates modernes, un éditeur intuitif et un export PDF de qualité professionnelle
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button asChild size="lg" className="text-lg px-8">
                                <Link href="/auth/signup">
                                    Commencer gratuitement
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="text-lg px-8">
                                <Link href="/auth/signin">
                                    Se connecter
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <StaggerChildren className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <Card className="border-2 hover:border-primary transition-colors">
                            <CardContent className="pt-6">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                    <Palette className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Templates Modernes</h3>
                                <p className="text-gray-600">
                                    Choisissez parmi plusieurs designs professionnels et personnalisez les couleurs
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 hover:border-primary transition-colors">
                            <CardContent className="pt-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <Zap className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Édition en temps réel</h3>
                                <p className="text-gray-600">
                                    Visualisez vos modifications instantanément pendant que vous éditez
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 hover:border-primary transition-colors">
                            <CardContent className="pt-6">
                                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                                    <Download className="w-6 h-6 text-pink-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Export PDF</h3>
                                <p className="text-gray-600">
                                    Téléchargez votre CV en haute qualité, prêt à être envoyé
                                </p>
                            </CardContent>
                        </Card>
                    </StaggerChildren>
                </div>
            </FadeIn>
        </main>
    )
}
