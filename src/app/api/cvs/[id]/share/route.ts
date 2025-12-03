import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { nanoid } from "nanoid"

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Non authentifié" },
                { status: 401 }
            )
        }

        // Vérifier que le CV appartient à l'utilisateur
        const cv = await prisma.cV.findFirst({
            where: {
                id: params.id,
                userId: session.user.id
            }
        })

        if (!cv) {
            return NextResponse.json(
                { error: "CV non trouvé" },
                { status: 404 }
            )
        }

        // Générer un ID de partage unique si pas déjà existant
        const shareId = cv.shareId || nanoid(10)

        await prisma.cV.update({
            where: { id: params.id },
            data: { shareId }
        })

        return NextResponse.json({
            shareId,
            shareUrl: `${process.env.NEXTAUTH_URL}/share/${shareId}`
        })
    } catch (error) {
        console.error("Erreur lors de la génération du lien:", error)
        return NextResponse.json(
            { error: "Une erreur est survenue" },
            { status: 500 }
        )
    }
}

// DELETE - Désactiver le partage
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Non authentifié" },
                { status: 401 }
            )
        }

        await prisma.cV.updateMany({
            where: {
                id: params.id,
                userId: session.user.id
            },
            data: {
                shareId: null
            }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Erreur lors de la désactivation du partage:", error)
        return NextResponse.json(
            { error: "Une erreur est survenue" },
            { status: 500 }
        )
    }
}
