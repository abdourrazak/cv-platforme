export default function HomePage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
                    <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                        CV Platforme
                    </h1>
                    <p className="text-2xl text-muted-foreground mb-8 max-w-2xl">
                        Créez votre CV professionnel en quelques minutes avec nos templates modernes
                    </p>
                    <div className="flex gap-4">
                        <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                            Créer mon CV gratuitement
                        </button>
                        <button className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                            Voir les templates
                        </button>
                    </div>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
                        <div className="p-6 bg-card rounded-lg border">
                            <div className="text-4xl mb-4">🎨</div>
                            <h3 className="text-xl font-semibold mb-2">Templates modernes</h3>
                            <p className="text-muted-foreground">
                                Choisissez parmi une sélection de templates professionnels et élégants
                            </p>
                        </div>
                        <div className="p-6 bg-card rounded-lg border">
                            <div className="text-4xl mb-4">✏️</div>
                            <h3 className="text-xl font-semibold mb-2">Éditeur en temps réel</h3>
                            <p className="text-muted-foreground">
                                Visualisez vos modifications instantanément pendant que vous éditez
                            </p>
                        </div>
                        <div className="p-6 bg-card rounded-lg border">
                            <div className="text-4xl mb-4">📥</div>
                            <h3 className="text-xl font-semibold mb-2">Export PDF</h3>
                            <p className="text-muted-foreground">
                                Téléchargez votre CV en haute qualité, prêt à être envoyé
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
