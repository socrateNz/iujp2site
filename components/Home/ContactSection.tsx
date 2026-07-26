"use client";

import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Service } from '@/lib/types';

const socialLinks = [
  { url: "https://www.facebook.com/share/1JL9TaknAV/?mibextid=wwXIfr", icon: <FaFacebookF size={16} /> },
  { url: "https://x.com/JeanPaul2Bfg?t=PYNQBSE2SocA7-MeAvUF_w&s=09", icon: <FaTwitter size={16} /> },
  { url: "https://vm.tiktok.com/ZMHsFkfXYDGX9-1lm01/", icon: <FaTiktok size={16} /> },
  { url: "https://www.instagram.com/univjeanpaul2_bafang/profilecard/?igsh=bW1la252dXZjcjc5", icon: <FaInstagram size={16} /> },
  { url: "https://wa.me/message/42RBUTP466X5I1", icon: <FaWhatsapp size={16} /> },
];

const contactItems = [
  { icon: <MapPin size={18} />, label: "Adresse", value: "Diocèse de Bafang, 558Q+7R5, Bafang", href: undefined },
  { icon: <Phone size={18} />, label: "Téléphone", value: "+237 6 87 65 24 67 / +237 6 52 99 23 01", href: "https://wa.me/message/42RBUTP466X5I1" },
  { icon: <Clock size={18} />, label: "Horaires", value: "Lun – Ven : 8h00 – 17h00", href: undefined },
];

const ContactSection = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setServices(data.data);
        }
      } catch (error) {
        console.error('Erreur chargement services:', error);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="contact" className="py-24" style={{ background: "#f5f6fa" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-4">

        {/* ── En-tête UIJP ── */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="uijp-section-title">
            Nous contacter
            <span>restons en contact</span>
          </h2>
          <div
            className="mt-3 h-1 w-16 rounded-full"
            style={{ background: "linear-gradient(90deg, #205C03, #0B30BB)" }}
          />
          <p
            className="mt-5 text-gray-500 max-w-2xl text-base leading-relaxed"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            Nous sommes à votre disposition pour répondre à toutes vos questions concernant
            nos formations et la vie sur notre campus.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ── Formulaire ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8"
            style={{
              borderLeft: "4px solid #205C03",
              borderBottom: "4px solid #0B30BB",
              boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
              borderRadius: "2px",
            }}
          >
            <h3
              className="font-bold text-[#2D2F2B] mb-6 uppercase text-lg"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", letterSpacing: "0.05em" }}
            >
              Formulaire de contact
            </h3>
            <ContactForm />
          </motion.div>

          {/* ── Infos + Carte ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Carte Google Maps */}
            <div
              className="overflow-hidden"
              style={{
                borderLeft: "4px solid #0B30BB",
                borderBottom: "4px solid #205C03",
                boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                borderRadius: "2px",
                height: "240px",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.6138122676666!2d10.18683637575225!3d5.1656632948117425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105fc36a7c74e4f5%3A0xa9d2ad509d32560a!2sUniversit%C3%A9%20Internationale%20Jean-Paul%20II!5e0!3m2!1sfr!2scm!4v1749765204496!5m2!1sfr!2scm"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Carte 1 : Infos de contact générales */}
            <div
              className="bg-white p-6"
              style={{
                borderLeft: "4px solid #205C03",
                borderBottom: "4px solid #E3A402",
                boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                borderRadius: "2px",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3
                    className="font-bold text-[#2D2F2B] mb-5 uppercase text-sm tracking-wider"
                    style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
                  >
                    Informations de contact
                  </h3>
                  <div className="space-y-4">
                    {contactItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-sm text-white mt-0.5"
                          style={{ background: "linear-gradient(135deg, #205C03 0%, #0B30BB 100%)" }}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <p
                            className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5"
                            style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
                          >
                            {item.label}
                          </p>
                          {item.href ? (
                            <Link
                              href={item.href}
                              target="_blank"
                              className="text-sm text-[#2D2F2B] hover:text-[#205C03] transition-colors"
                              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                            >
                              {item.value}
                            </Link>
                          ) : (
                            <p
                              className="text-sm text-gray-600"
                              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                            >
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Réseaux sociaux */}
                  <div className="mt-6">
                    <p
                      className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3"
                      style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
                    >
                      Suivez-nous
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {socialLinks.map((social, i) => (
                        <Link
                          key={i}
                          href={social.url}
                          target="_blank"
                          className="w-9 h-9 flex items-center justify-center rounded-sm text-white transition-opacity hover:opacity-80"
                          style={{ background: "linear-gradient(135deg, #205C03 0%, #0B30BB 100%)" }}
                        >
                          {social.icon}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* QR WhatsApp */}
                <div className="flex flex-col items-center justify-center">
                  <p
                    className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 text-center"
                    style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
                  >
                    Scanner pour nous écrire
                  </p>
                  <img
                    src="/Images/whatsapp.jpg"
                    alt="QR WhatsApp"
                    className="max-w-[140px] rounded-sm shadow-md"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Carte 2 : Card séparée pour Services & Contacts Directs */}
        {services.length > 0 && (
          <div
            className="bg-white p-6"
            style={{
              borderLeft: "4px solid #205C03",
              borderBottom: "4px solid #0B30BB",
              boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
              borderRadius: "2px",
            }}
          >
            <h4
              className="font-bold text-[#2D2F2B] mb-4 uppercase text-xs tracking-wider flex items-center gap-2"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
            >
              <Building2 size={16} className="text-[#205C03]" />
              Services & Contacts Directs
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((service) => (
                <a
                  href={`mailto:${service.email}`}
                  key={service._id?.toString() || service.name}
                  className="p-3 rounded bg-slate-50 border border-slate-100 flex flex-col justify-between transition-all hover:border-[#205C03]/30"

                >
                  <div>
                    <p className="text-xs font-bold text-[#2D2F2B] mb-0.5">{service.name}</p>
                    {service.description && (
                      <p className="text-[11px] text-gray-500 line-clamp-1 mb-1">{service.description}</p>
                    )}
                  </div>
                  <div
                    className="text-xs text-[#0B30BB] hover:text-[#205C03] font-medium flex items-center gap-1.5 transition-colors mt-1"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                    <Mail size={13} className="shrink-0" />
                    <span className="truncate">{service.email}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;