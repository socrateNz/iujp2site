'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from 'react'
import { Service } from '@/lib/types'

// 1. Schema Zod
const formSchema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  subject: z.string().min(1, 'Le sujet est requis'),
  serviceId: z.string().min(1, 'Veuillez sélectionner un service'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  privacy: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter la politique de confidentialité',
  }),
})

// 2. Formulaire
export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const [loadingServices, setLoadingServices] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services')
        const data = await response.json()
        if (data.success) {
          setServices(data.data)
        }
      } catch (error) {
        console.error('Erreur lors du chargement des services', error)
      } finally {
        setLoadingServices(false)
      }
    }
    fetchServices()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      serviceId: '',
      message: '',
      privacy: false,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.subject,
          serviceId: values.serviceId,
          message: values.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        form.reset(); // Optionnel : reset du formulaire
      } else {
        alert(data.error || "Erreur lors de l'envoi du message.");
      }
    } catch (error) {
      alert("Erreur réseau ou serveur.");
      console.error(error);
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom complet</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="votre.email@exemple.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objet</FormLabel>
                <FormControl>
                  <Input placeholder="Objet de votre message" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="serviceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service destinataire</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={loadingServices ? "Chargement..." : "Sélectionner un service"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service._id?.toString()} value={service._id?.toString() || ''}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Votre message" className="min-h-[150px] resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="privacy"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-2">
              <FormControl>
                <input
                  type="checkbox"
                  id="privacy"
                  className="mt-1"
                  checked={field.value}
                  onChange={e => field.onChange(e.target.checked)}
                />
              </FormControl>
              <FormLabel htmlFor="privacy" className="text-sm font-normal text-gray-600">
                J'accepte la politique de confidentialité
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="btn-uijp w-full justify-center"
        >
          Envoyer le message
        </button>

        {submitted && <p className="text-green-600 text-sm text-center">Message envoyé avec succès !</p>}
      </form>
    </Form>
  )
}
