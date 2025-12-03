import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET - Récupérer un CV spécifique
export async function GET(
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

        return NextResponse.json({
            ...cv,
            data: typeof cv.data === 'string' ? JSON.parse(cv.data) : cv.data
        })
    } catch (error) {
        console.error("Erreur lors de la récupération du CV:", error)
        return NextResponse.json(
            { error: "Une erreur est survenue" },
            { status: 500 }
        )
    }
}

// PUT - Mettre à jour un CV
export async function PUT(
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

        const body = await req.json()
        const { title, templateId, colorScheme, fontFamily, data } = body

        const cv = await prisma.cV.updateMany({
            where: {
                id: params.id,
                userId: session.user.id
            },
            data: {
                title,
                templateId,
                colorScheme,
                fontFamily,
                data: JSON.stringify(data),
                updatedAt: new Date()
            }
        })

        if (cv.count === 0) {
            return NextResponse.json(
                { error: "CV non trouvé" },
                { status: 404 }
            )
        }

        const updatedCv = await prisma.cV.findUnique({
            where: { id: params.id }
        })

        return NextResponse.json({
            ...updatedCv,
            data: typeof updatedCv?.data === 'string' ? JSON.parse(updatedCv.data) : updatedCv?.data
        })
    } catch (error) {
        console.error("Erreur lors de la mise à jour du CV:", error)
        return NextResponse.json(
            { error: "Une erreur est survenue" },
            { status: 500 }
        )
    }
}

// DELETE - Supprimer un CV
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

        await prisma.cV.deleteMany({
            where: {
                id: params.id,
                userId: session.user.id
            }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Erreur lors de la suppression du CV:", error)
        return NextResponse.json(
            { error: "Une erreur est survenue" },
            { status: 500 }
        )
    }
}
