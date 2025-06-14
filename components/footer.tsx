const Footer = () => {
  const links = [
    {
      title: "Liens rapides",
      items: [
        { label: "Accueil", href: "#accueil" },
        { label: "À propos", href: "#a-propos" },
        { label: "Formations", href: "#formations" },
        { label: "Vie étudiante", href: "#vie-etudiante" },
        { label: "Actualités", href: "#blog" },
        { label: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Informations",
      items: [
        { label: "Admissions", href: "#" },
        { label: "Frais de scolarité", href: "#" },
        { label: "Bourses", href: "#" },
        { label: "Bibliothèque", href: "#" },
        { label: "Calendrier académique", href: "#" },
        { label: "Offres d'emploi", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-[#1B2A4A] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-serif font-bold mb-6">Institut Universitaire<br />Jean-Paul II</h3>
            <p className="text-gray-300 mb-6">
              Excellence académique, innovation et valeurs humanistes pour former les leaders de demain.
            </p>
            <div className="flex space-x-4">
              {['facebook-f', 'twitter', 'linkedin-in', 'instagram'].map((social, index) => (
                <a key={index} href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer">
                  <i className={`fab fa-${social}`}></i>
                </a>
              ))}
            </div>
          </div>
          {links.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a href={item.href} className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mr-3 mt-1 text-[#D4AF37]"></i>
                <span>123 Avenue des Universités<br />75006 Paris, France</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-[#D4AF37]"></i>
                <span>+33 (0)1 23 45 67 89</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-[#D4AF37]"></i>
                <span>contact@iujp2.fr</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-bold mb-3">Moyens de paiement acceptés</h4>
              <div className="flex space-x-3">
                {['cc-visa', 'cc-mastercard', 'cc-paypal'].map((payment, index) => (
                  <i key={index} className={`fab fa-${payment} text-2xl text-gray-300`}></i>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© 2025 Institut Universitaire Jean-Paul II. Tous droits réservés.</p>
          <div className="flex justify-center space-x-6 mt-4">
            {['Mentions légales', 'Politique de confidentialité', 'Accessibilité'].map((item, index) => (
              <a key={index} href="#" className="hover:text-[#D4AF37] transition-colors cursor-pointer">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;