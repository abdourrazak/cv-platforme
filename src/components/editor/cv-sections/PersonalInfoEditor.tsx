"use client"

import { useCV } from "@/context/CVContext"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, X, User } from "lucide-react"
import { useState } from "react"

export function PersonalInfoEditor() {
    const { cv, dispatch } = useCV()
    const { personalInfo } = cv.data
    const [photoPreview, setPhotoPreview] = useState<string | null>(personalInfo.photo || null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch({
            type: 'UPDATE_PERSONAL_INFO',
            payload: { [name]: value }
        })
    }

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64 = reader.result as string
                setPhotoPreview(base64)
                dispatch({
                    type: 'UPDATE_PERSONAL_INFO',
                    payload: { photo: base64 }
                })
            }
            reader.readAsDataURL(file)
        }
    }

    const removePhoto = () => {
        setPhotoPreview(null)
        dispatch({
            type: 'UPDATE_PERSONAL_INFO',
            payload: { photo: '' }
        })
    }

    return (
        <div className="space-y-6">
            {/* Photo Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Photo de profil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            {photoPreview ? (
                                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                                    <img
                                        src={photoPreview}
                                        alt="Photo de profil"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={removePhoto}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-gray-200 flex items-center justify-center">
                                    <User className="w-16 h-16 text-gray-400" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 space-y-2">
                            <p className="text-sm text-muted-foreground">
                                Ajoutez une photo professionnelle pour personnaliser votre CV
                            </p>
                            <label htmlFor="photo-upload">
                                <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                                    <span>
                                        <Upload className="w-4 h-4 mr-2" />
                                        Choisir une photo
                                    </span>
                                </Button>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handlePhotoUpload}
                                />
                            </label>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Informations de contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">Prénom</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                value={personalInfo.firstName}
                                onChange={handleChange}
                                placeholder="Jean"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Nom</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                value={personalInfo.lastName}
                                onChange={handleChange}
                                placeholder="Dupont"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title">Titre du profil</Label>
                        <Input
                            id="title"
                            name="title"
                            value={personalInfo.title}
                            onChange={handleChange}
                            placeholder="Développeur Fullstack"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={personalInfo.email}
                                onChange={handleChange}
                                placeholder="jean.dupont@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Téléphone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={personalInfo.phone}
                                onChange={handleChange}
                                placeholder="06 12 34 56 78"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Input
                            id="address"
                            name="address"
                            value={personalInfo.address}
                            onChange={handleChange}
                            placeholder="123 Rue de la Paix"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">Ville</Label>
                            <Input
                                id="city"
                                name="city"
                                value={personalInfo.city}
                                onChange={handleChange}
                                placeholder="Paris"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="country">Pays</Label>
                            <Input
                                id="country"
                                name="country"
                                value={personalInfo.country}
                                onChange={handleChange}
                                placeholder="France"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Réseaux sociaux</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                            id="linkedin"
                            name="linkedin"
                            value={personalInfo.linkedin || ''}
                            onChange={handleChange}
                            placeholder="linkedin.com/in/jeandupont"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="website">Site web / Portfolio</Label>
                        <Input
                            id="website"
                            name="website"
                            value={personalInfo.website || ''}
                            onChange={handleChange}
                            placeholder="www.jeandupont.fr"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
