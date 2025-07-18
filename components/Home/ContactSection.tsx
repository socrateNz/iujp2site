import React from 'react';
import ContactForm from './ContactForm';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1B2A4A] mb-4">Contact</h2>
          <div className="w-20 h-1 bg-[#34773D] mx-auto"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">{"Nous sommes à votre disposition pour répondre à toutes vos questions concernant nos formations et la vie sur notre campus."}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-serif font-bold text-[#1B2A4A] mb-6">Formulaire de contact</h3>
            <ContactForm />
          </div>
          <div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="h-[300px] bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.6138122676666!2d10.18683637575225!3d5.1656632948117425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105fc36a7c74e4f5%3A0xa9d2ad509d32560a!2sUniversit%C3%A9%20Internationale%20Jean-Paul%20II!5e0!3m2!1sfr!2scm!4v1749765204496!5m2!1sfr!2scm"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-serif font-bold text-[#1B2A4A] mb-6">Informations de contact</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 text-[#34773D]">
                    <i className="fas fa-map-marker-alt text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1B2A4A] mb-1">Adresse</h4>
                    <p className="text-gray-600">Diocèse de Bafang <br />558Q+7R5, Bafang</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 text-[#34773D]">
                    <i className="fas fa-phone-alt text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1B2A4A] mb-1">Téléphone</h4>
                    <p className="text-gray-600">696 259 025 - 671 525 662 - 699 305 168</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 text-[#34773D]">
                    <i className="fas fa-envelope text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1B2A4A] mb-1">Email</h4>
                    <p className="text-gray-600">contact@uijp2.fr</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 text-[#34773D]">
                    <i className="fas fa-clock text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1B2A4A] mb-1">{"Horaires d'ouverture"}</h4>
                    <p className="text-gray-600">Lundi - Vendredi: 8h30 - 18h00<br />Samedi: 9h00 - 12h00</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="font-bold text-[#1B2A4A] mb-4">Suivez-nous</h4>
                <div className="flex space-x-4">
                  {[<FaFacebookF size={18} />, <FaTwitter size={18} />, <FaLinkedinIn size={18} />, <FaInstagram size={18} />].map((social, index) => (
                    <a key={index} href="#" className="w-10 h-10 rounded-full bg-[#1B2A4A] flex items-center justify-center text-white hover:bg-[#34773D] transition-colors cursor-pointer">
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;