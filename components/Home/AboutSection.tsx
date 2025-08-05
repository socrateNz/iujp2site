import { Button } from "../ui/button";


const AboutSection = () => {
  const features = [
    { icon: 'medal', title: 'Excellence académique', description: 'Des programmes rigoureux et des enseignants de haut niveau.' },
    { icon: 'globe-americas', title: 'Dimension internationale', description: 'Des partenariats avec des universités prestigieuses.' },
    { icon: 'lightbulb', title: 'Innovation pédagogique', description: 'Des méthodes d\'enseignement adaptées aux réalités contemporaines.' },
    { icon: 'hands-helping', title: 'Engagement spirituel', description: 'Une formation qui renforce la foi, les valeurs chrétiennes et le sens du service.' }
  ];

  return (
    <section id="a-propos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1B2A4A] mb-4">À propos de notre Institut</h2>
          <div className="w-20 h-1 bg-[#34773D] mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="/Images/histoire.webp"
              alt="Équipe de l'Université Internationale Jean Paul II de Bafang"
              className="rounded-lg shadow-xl object-cover w-full h-[500px] object-top"
            />
            <div className="absolute -bottom-6 -right-6 bg-[#34773D] text-white p-6 rounded-lg shadow-lg hidden md:block">
              <p className="text-lg font-serif">Fondé en 2015</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#1B2A4A] mb-4">Notre histoire et notre mission</h3>
            <p className="text-gray-700 mb-6">
            Fondé en 2015, par <b>Mgr. Abraham KOME Evêque du Diocese de Bafang, Grand Chancelier et Administrateur principal</b>, l'Université Internationale Jean Paul II de Bafang s'est imposé comme un établissement d'excellence dans le paysage de l'enseignement supérieur camerounais. Notre mission est de former des esprits critiques, créatifs et engagés, capables de relever les défis complexes du monde contemporain.
            </p>
            <p className="text-gray-700 mb-6">
              {"Nous nous distinguons par notre approche pédagogique innovante qui allie rigueur académique, ouverture internationale et accompagnement spirituel. Nos programmes sont constamment actualisés pour répondre aux évolutions du marché du travail et aux enjeux sociétaux."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 mt-1 text-[#34773D]">
                    <i className={`fas fa-${feature.icon} text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1B2A4A] mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* <Button className="bg-[#1B2A4A] hover:bg-[#0F1A30] text-white !rounded-button whitespace-nowrap">
              Découvrir notre histoire
              <i className="fas fa-arrow-right ml-2"></i>
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;