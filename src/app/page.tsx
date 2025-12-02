import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeIn } from "@/components/animations/FadeIn"
import { StaggerChildren } from "@/components/animations/StaggerChildren"

export default function HomePage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <div className="container mx-auto px-4 py-16">
                <FadeIn className="flex flex-col items-center justify-center min-h-[80vh] text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                        CV Platforme
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
                        Créez votre CV professionnel en quelques minutes avec nos templates modernes
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-16">
                        <Button size="lg" className="text-base">
                            Créer mon CV gratuitement
                        </Button>
                        <Button size="lg" variant="outline" className="text-base">
                            Voir les templates
                        </Button>
                    </div>

                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
                        <Card className="border-2 hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <div className="text-5xl mb-4">🎨</div>
                                <CardTitle>Templates modernes</CardTitle>
                                <CardDescription>
                                    Choisissez parmi une sélection de templates professionnels et élégants
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-2 hover:border-secondary/50 transition-colors">
                            <CardHeader>
                                <div className="text-5xl mb-4">✏️</div>
                                <CardTitle>Éditeur en temps réel</CardTitle>
                                <CardDescription>
                                    Visualisez vos modifications instantanément pendant que vous éditez
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-2 hover:border-accent/50 transition-colors">
                            <CardHeader>
                                <div className="text-5xl mb-4">📥</div>
                                <CardTitle>Export PDF</CardTitle>
                                <CardDescription>
                                    Téléchargez votre CV en haute qualité, prêt à être envoyé
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </StaggerChildren>
                </FadeIn>
            </div>
        </main>
    );
}
