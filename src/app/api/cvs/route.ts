import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET - Récupérer tous les CVs de l'utilisateur
export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Non authentifié" },
                { status: 401 }
            )
        }

        const cvs = await prisma.cV.findMany({
            where: {
                userId: session.user.id
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })

        // Parser les données JSON
        const parsedCvs = cvs.map(cv => ({
            ...cv,
            data: typeof cv.data === 'string' ? JSON.parse(cv.data) : cv.data
        }))

        return NextResponse.json(parsedCvs)
    } catch (error) {
        console.error("Erreur lors de la récupération des CVs:", error)
        return NextResponse.json(
            { error: "Une erreur est survenue" },
            { status: 500 }
        )
    }
}

// POST - Créer un nouveau CV
export async function POST(req: Request) {
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

        const cv = await prisma.cV.create({
            data: {
                userId: session.user.id,
                title: title || "Nouveau CV",
                templateId: templateId || "modern",
                colorScheme: colorScheme || "blue",
                fontFamily: fontFamily || "inter",
                data: JSON.stringify(data)
            }
        })

        return NextResponse.json({
            ...cv,
            data: typeof cv.data === 'string' ? JSON.parse(cv.data) : cv.data
        }, { status: 201 })
    } catch (error) {
        console.error("Erreur lors de la création du CV:", error)
        return NextResponse.json(
            { error: "Une erreur est survenue" },
            { status: 500 }
        )
    }
}
