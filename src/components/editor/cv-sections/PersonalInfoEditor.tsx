"use client"

import { useCV } from "@/context/CVContext"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PersonalInfoEditor() {
    const { cv, dispatch } = useCV()
    const { personalInfo } = cv.data

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch({
            type: 'UPDATE_PERSONAL_INFO',
            payload: { [name]: value }
        })
    }

    return (
        <div className="space-y-6">
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
