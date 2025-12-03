"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Share2, Copy, Check, Link as LinkIcon, X } from "lucide-react"

interface ShareDialogProps {
    cvId: string
    currentShareId?: string | null
}

export function ShareDialog({ cvId, currentShareId }: ShareDialogProps) {
    const [open, setOpen] = useState(false)
    const [shareId, setShareId] = useState(currentShareId)
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    const shareUrl = shareId
        ? `${window.location.origin}/share/${shareId}`
        : null

    const generateShareLink = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/cvs/${cvId}/share`, {
                method: "POST"
            })

            if (response.ok) {
                const data = await response.json()
                setShareId(data.shareId)
            }
        } catch (error) {
            console.error("Erreur lors de la génération du lien:", error)
        } finally {
            setLoading(false)
        }
    }

    const disableSharing = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/cvs/${cvId}/share`, {
                method: "DELETE"
            })

            if (response.ok) {
                setShareId(null)
            }
        } catch (error) {
            console.error("Erreur lors de la désactivation:", error)
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = () => {
        if (shareUrl) {
            navigator.clipboard.writeText(shareUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Partager votre CV</DialogTitle>
                    <DialogDescription>
                        Générez un lien public pour partager votre CV avec n'importe qui
                    </DialogDescription>
                </DialogHeader>

                {!shareId ? (
                    <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg">
                            <div className="flex items-start gap-3">
                                <LinkIcon className="w-5 h-5 text-muted-foreground mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Lien de partage</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Créez un lien public pour partager votre CV. Toute personne avec le lien pourra le consulter et le télécharger.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={generateShareLink}
                            disabled={loading}
                            className="w-full"
                        >
                            {loading ? "Génération..." : "Générer le lien de partage"}
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="share-link">Lien de partage</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="share-link"
                                    value={shareUrl || ""}
                                    readOnly
                                    className="flex-1"
                                />
                                <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={copyToClipboard}
                                >
                                    {copied ? (
                                        <Check className="w-4 h-4 text-green-600" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>
                            {copied && (
                                <p className="text-xs text-green-600">Lien copié !</p>
                            )}
                        </div>

                        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                            <p className="text-xs text-blue-800">
                                ✓ Votre CV est maintenant accessible publiquement via ce lien
                            </p>
                        </div>

                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={disableSharing}
                            disabled={loading}
                            className="w-full"
                        >
                            <X className="w-4 h-4 mr-2" />
                            {loading ? "Désactivation..." : "Désactiver le partage"}
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
