"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react'



const DemandeInscription = () => {

    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        message: '',
        consentement: false
    });
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Traitement du formulaire
        console.log(formData);
        alert("Votre demande d'information a été envoyée avec succès. Nous vous contacterons prochainement.");
        // Réinitialisation du formulaire
        setFormData({
            nom: '',
            prenom: '',
            email: '',
            telephone: '',
            message: '',
            consentement: false
        });
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div id="contact">
            <h3 className="text-2xl font-serif font-bold text-[#1B2A4A] mb-6">{"Formulaire de demande d'information"}</h3>
            <div className="bg-white rounded-lg shadow-md p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="nom" className="text-sm font-medium text-gray-700">Nom</label>
                            <Input
                                id="nom"
                                name="nom"
                                value={formData.nom}
                                onChange={handleInputChange}
                                placeholder="Votre nom"
                                className="border-gray-300"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="prenom" className="text-sm font-medium text-gray-700">Prénom</label>
                            <Input
                                id="prenom"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleInputChange}
                                placeholder="Votre prénom"
                                className="border-gray-300"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                            <Input
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                type="email"
                                placeholder="votre.email@exemple.com"
                                className="border-gray-300"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="telephone" className="text-sm font-medium text-gray-700">Téléphone</label>
                            <Input
                                id="telephone"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleInputChange}
                                placeholder="+33 6 12 34 56 78"
                                className="border-gray-300"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-gray-700">Votre message ou question</label>
                        <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder={"Précisez votre demande d'information ou vos questions concernant cette formation..."}
                            className="border-gray-300 min-h-[150px]"
                            required
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="consentement"
                            name="consentement"
                            checked={formData.consentement}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                            required
                        />
                        <label htmlFor="consentement" className="text-sm text-gray-600">
                            {"J'accepte que mes données soient traitées pour recevoir des informations sur cette formation. Consultez notre"} <a href="#" className="text-[#34773D] hover:underline">politique de confidentialité</a>.
                        </label>
                    </div>

                    <Button type="submit" className="cursor-pointer w-full bg-[#34773D] hover:bg-[#34773D]/80 text-white !rounded-button whitespace-nowrap">
                        {"Envoyer ma demande d'information"}
                        <i className="fas fa-paper-plane ml-2"></i>
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default DemandeInscription
