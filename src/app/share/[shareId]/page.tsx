import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ModernTemplate } from "@/components/templates/ModernTemplate"
import { MinimalistTemplate } from "@/components/templates/MinimalistTemplate"
import { CreativeTemplate } from "@/components/templates/CreativeTemplate"
import { ExecutiveTemplate } from "@/components/templates/ExecutiveTemplate"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"
import Link from "next/link"

async function getSharedCV(shareId: string) {
    const cv = await prisma.cV.findFirst({
        where: {
            shareId: shareId
        },
        include: {
            user: {
                select: {
                    name: true
                }
            }
        }
    })

    if (!cv) {
        return null
    }

    return {
        ...cv,
        data: typeof cv.data === 'string' ? JSON.parse(cv.data) : cv.data
    }
}

export default async function SharedCVPage({ params }: { params: { shareId: string } }) {
    const cv = await getSharedCV(params.shareId)

    if (!cv) {
        notFound()
    }

    const renderTemplate = () => {
        switch (cv.templateId) {
            case 'minimalist':
                return <MinimalistTemplate data={cv.data} colorScheme={cv.colorScheme} fontFamily={cv.fontFamily} />
            case 'creative':
                return <CreativeTemplate data={cv.data} colorScheme={cv.colorScheme} fontFamily={cv.fontFamily} />
            case 'executive':
                return <ExecutiveTemplate data={cv.data} colorScheme={cv.colorScheme} fontFamily={cv.fontFamily} />
            case 'modern':
            default:
                return <ModernTemplate data={cv.data} colorScheme={cv.colorScheme} fontFamily={cv.fontFamily} />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
            {/* Header */}
            <header className="bg-white border-b shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="font-semibold text-lg">{cv.title}</h1>
                            <p className="text-sm text-muted-foreground">
                                Partagé par {cv.user.name}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/">
                                Créer mon CV
                            </Link>
                        </Button>
                        <Button id="download-btn">
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger PDF
                        </Button>
                    </div>
                </div>
            </header>

            {/* CV Preview */}
            <main className="container mx-auto px-4 py-8 flex justify-center">
                <div
                    id="cv-preview"
                    className="w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-lg overflow-hidden"
                >
                    {renderTemplate()}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t mt-12 py-6">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                    <p>
                        Créé avec{" "}
                        <Link href="/" className="text-primary hover:underline font-medium">
                            CV Platforme
                        </Link>
                        {" "}- La plateforme moderne de création de CV
                    </p>
                </div>
            </footer>

            {/* Script pour le téléchargement PDF */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `
            document.getElementById('download-btn')?.addEventListener('click', async function(e) {
              e.preventDefault();
              const { default: html2canvas } = await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm');
              const { default: jsPDF } = await import('https://cdn.jsdelivr.net/npm/jspdf@2.5.2/+esm');
              
              const element = document.getElementById('cv-preview');
              const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false
              });
              
              const imgData = canvas.toDataURL('image/png');
              const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
              });
              
              const imgWidth = 210;
              const imgHeight = (canvas.height * imgWidth) / canvas.width;
              
              pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
              pdf.save('${cv.data.personalInfo.firstName}-${cv.data.personalInfo.lastName}-CV.pdf');
            });
          `
                }}
            />
        </div>
    )
}
