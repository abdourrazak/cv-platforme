import { CVProvider } from "@/context/CVContext"

export default function EditorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <CVProvider>
            <div className="h-screen flex flex-col overflow-hidden bg-background">
                {children}
            </div>
        </CVProvider>
    )
}
