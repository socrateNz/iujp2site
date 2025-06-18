import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const links = [
    {
      title: "Liens rapides",
      items: [
        { label: "Accueil", href: "/" },
        { label: "Nos Ecoles", href: "/nos-ecoles" },
        { label: "Formations", href: "/formations" },
        { label: "Actualités", href: "/actualites" },
        { label: "Contacts", href: "/contacts" },
      ]
    },
    {
      title: "Nos Ecoles",
      items: [
        { label: "Institut Supérieur de Bafang. (ISB)", href: "/nos-ecoles/" },
        { label: "École des sciences de la santé de l'institut supérieur de Bafang (ESS-ISB)", href: "/nos-ecoles/" },
        { label: "Kesmond international university (KIU)", href: "/nos-ecoles/" },
        { label: "FASA", href: "/nos-ecoles/" },
      ]
    }
  ];

  return (
    <footer className="bg-[#1B2A4A] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3">
              <img src="/Images/logo.png" alt="Logo" className="h-20 w-20" />
              <h3 className="text-xl font-serif font-bold mb-6 max-w-[250px] w-full flex justify-center">Institut Universitaire Jean-Paul II</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Excellence académique, innovation et valeurs humanistes pour former les leaders de demain.
            </p>
            <div className="flex space-x-4">
              {[<FaFacebookF size={18} />, <FaTwitter size={18} />, <FaLinkedinIn size={18} />, <FaInstagram size={18} />].map((social, index) => (
                <a key={index} href="#" className="text-gray-300 hover:text-[#34773D] transition-colors cursor-pointer">
                  {social}
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
                    <a href={item.href} className="text-gray-300 hover:text-[#34773D] transition-colors cursor-pointer">
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
                <i className="fas fa-map-marker-alt mr-3 mt-1 text-[#34773D]"></i>
                <span>Diocèse de Bafang<br />558Q+7R5, Bafang</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-[#34773D]"></i>
                <span>696 259 025 - 671 525 662 - 699 305 168</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-[#34773D]"></i>
                <span>contact@iujp2.fr</span>
              </li>
            </ul>
            {/* <div className="mt-6">
              <h4 className="text-sm font-bold mb-3">Moyens de paiement acceptés</h4>
              <div className="flex space-x-3">
                {['cc-visa', 'cc-mastercard', 'cc-paypal'].map((payment, index) => (
                  <i key={index} className={`fab fa-${payment} text-2xl text-gray-300`}></i>
                ))}
              </div>
            </div> */}
          </div>
        </div>
        <div className="pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© 2025 Institut Universitaire Jean-Paul II. Tous droits réservés.</p>
          {/* <div className="flex justify-center space-x-6 mt-4">
            {['Mentions légales', 'Politique de confidentialité', 'Accessibilité'].map((item, index) => (
              <a key={index} href="#" className="hover:text-[#34773D] transition-colors cursor-pointer">
                {item}
              </a>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;