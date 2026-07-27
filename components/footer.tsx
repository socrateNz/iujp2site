"use client";

import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { Ecole, Service } from "@/lib/types";
import { Phone, Mail } from "lucide-react";

const Footer = () => {
  const pathname = usePathname();
  const [ecoles, setEcoles] = useState<Ecole[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/ecoles?limit=100")
      .then((res) => res.json())
      .then((data) => {
        setEcoles(data.data?.ecoles || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setServices(data.data);
        }
      })
      .catch(console.error);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const quickLinks = [
    { label: "Accueil", href: "/" },
    { label: "Nos Écoles", href: "/nos-ecoles" },
    { label: "Formations", href: "/formations" },
    { label: "Actualités", href: "/actualites" },
    { label: "Contacts", href: "/contacts" },
  ];

  const socialLinks = [
    { url: "https://www.facebook.com/share/1JL9TaknAV/?mibextid=wwXIfr", icon: <FaFacebookF size={15} />, label: "Facebook" },
    { url: "https://x.com/JeanPaul2Bfg?t=PYNQBSE2SocA7-MeAvUF_w&s=09", icon: <FaTwitter size={15} />, label: "Twitter" },
    { url: "https://vm.tiktok.com/ZMHsFkfXYDGX9-1lm01/", icon: <FaTiktok size={15} />, label: "TikTok" },
    { url: "https://www.instagram.com/univjeanpaul2_bafang/profilecard/?igsh=bW1la252dXZjcjc5", icon: <FaInstagram size={15} />, label: "Instagram" },
    { url: "https://wa.me/message/42RBUTP466X5I1", icon: <FaWhatsapp size={15} />, label: "WhatsApp" },
  ];

  return (
    <footer style={{ background: "#011636", color: "#f5f6fa" }}>
      {/* ── Bande supérieure gradient UIJP ── */}
      <div
        className="h-1.5 w-full"
        style={{ background: "linear-gradient(90deg, #205C03 0%, #0B30BB 100%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* ── Colonne 1 : Logo + Devise + Réseaux ── */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/Images/logo.png" alt="UIJP2 Logo" className="w-14 h-14 object-contain" />
              <div>
                <p
                  className="font-black uppercase text-white text-xs leading-tight"
                  style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif", letterSpacing: "0.08em", maxWidth: "150px" }}
                >
                  Université Internationale Jean Paul II
                </p>
                <p
                  className="text-xs uppercase tracking-widest"
                  style={{
                    fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                    background: "linear-gradient(90deg, #205C03, #0B30BB)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  de Bafang
                </p>
              </div>
            </div>
            <p
              className="text-white/50 text-sm italic mb-6 leading-relaxed"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Science et conscience pour un monde meilleur
            </p>

            {/* Réseaux sociaux */}
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social, i) => (
                <Link
                  key={i}
                  href={social.url}
                  target="_blank"
                  aria-label={social.label}
                  className="w-9 h-9 flex items-center justify-center rounded-sm text-white transition-opacity hover:opacity-80"
                  style={{ background: "linear-gradient(135deg, #205C03 0%, #0B30BB 100%)" }}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Colonne 2 : Liens rapides ── */}
          <div>
            <h4
              className="font-bold text-white uppercase mb-5 text-sm tracking-widest pb-2"
              style={{
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                borderBottom: "2px solid #205C03",
                display: "inline-block",
              }}
            >
              Liens rapides
            </h4>
            <ul className="space-y-3 mt-1">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0 transition-all group-hover:w-3"
                      style={{ background: "linear-gradient(90deg, #205C03, #0B30BB)" }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Colonne 3 : Nos Écoles ── */}
          <div>
            <h4
              className="font-bold text-white uppercase mb-5 text-sm tracking-widest pb-2"
              style={{
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                borderBottom: "2px solid #E3A402",
                display: "inline-block",
              }}
            >
              Nos Écoles
            </h4>
            <ul className="space-y-3 mt-1">
              {loading ? (
                <li className="text-white/30 text-sm italic">Chargement…</li>
              ) : (
                ecoles.map((ecole, i) => (
                  <li key={i}>
                    <Link
                      href={`/nos-ecoles/${ecole._id}`}
                      className="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0 transition-all group-hover:w-3"
                        style={{ background: "linear-gradient(90deg, #0B30BB, #205C03)" }}
                      />
                      {ecole.title}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* ── Colonne 4 : Contact ── */}
          <div>
            <h4
              className="font-bold text-white uppercase mb-5 text-sm tracking-widest pb-2"
              style={{
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                borderBottom: "2px solid #0B30BB",
                display: "inline-block",
              }}
            >
              Contact
            </h4>
            <ul className="space-y-3 mt-1">
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0" style={{ color: "#E3A402" }} />
                <Link
                  href="https://wa.me/message/42RBUTP466X5I1"
                  target="_blank"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  +237 6 87 65 24 67<br />+237 6 52 99 23 01
                </Link>
              </li>
            </ul>

            {/* Services (Nom + Email) */}
            {services.length > 0 && (
              <div className="mt-5 pt-4 border-t border-white/10 space-y-3">
                <p
                  className="text-xs font-bold uppercase tracking-wider text-[#E3A402]"
                  style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
                >
                  Services & Emails :
                </p>
                {services.map((service) => (
                  <div key={service._id?.toString() || service.name} className="text-xs">
                    <p className="text-white/90 font-semibold">{service.name}</p>
                    <a
                      href={`mailto:${service.email}`}
                      className="text-white/60 hover:text-white transition-colors text-[11px] block truncate"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      {service.email}
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Candidature */}
            <div className="mt-6">
              <Link href="/candidature" className="btn-uijp text-sm w-full justify-center">
                Candidature
              </Link>
            </div>
          </div>
        </div>

        {/* ── Bas de footer ── */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/30"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            fontFamily: "var(--font-inter), Inter, sans-serif",
          }}
        >
          <p>© 2025 Université Internationale Jean Paul II de Bafang. Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            Conçu et développé par{" "}
            <Link
              href="https://portfolio-socrate.vercel.app/fr"
              target="_blank"
              className="hover:text-white transition-colors"
              style={{
                background: "linear-gradient(90deg, #205C03, #0B30BB)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 600,
              }}
            >
              Etarcos Dev
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;