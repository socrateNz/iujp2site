export type Formation = {
    id: number;
    title: string;
    image: string;
    description: string;
    duration: string;
    classe: string;
};

export const formations = {
    bts: [
        {
            id: 11,
            title: "BTS en Commerce International",
            image: "https://readdy.ai/api/search-image?query=International%20trade%20students%20studying%20import-export%20in%20a%20business%20school%2C%20diverse%20team%2C%20maps%2C%20cargo%20charts&width=400&height=250&orientation=landscape",
            description: "Formation en techniques d'import-export et négociation internationale.",
            duration: "2 ans",
            classe: "bts"
        },
        {
            id: 12,
            title: "BTS en Comptabilité et Gestion des Entreprises",
            image: "https://readdy.ai/api/search-image?query=Accounting%20and%20management%20students%2C%20financial%20analysis%20workshop%2C%20modern%20classroom&width=400&height=250&orientation=landscape",
            description: "Gestion comptable, analyse financière et fiscalité des PME.",
            duration: "2 ans",
            classe: "bts"
        },
        {
            id: 13,
            title: "BTS en Communication des Organisations",
            image: "https://readdy.ai/api/search-image?query=Communication%20students%20planning%20campaigns%2C%20creative%20workspace%2C%20PR%2C%20media%2C%20branding&width=400&height=250&orientation=landscape",
            description: "Communication interne et externe des entreprises, relations publiques.",
            duration: "2 ans",
            classe: "bts"
        },
        {
            id: 14,
            title: "BTS en Logistique et Transport",
            image: "https://readdy.ai/api/search-image?query=Logistics%20students%20with%20supply%20chain%20diagrams%2C%20transport%20planning%20tools%2C%20distribution%20systems&width=400&height=250&orientation=landscape",
            description: "Gestion des flux logistiques, entreposage et distribution.",
            duration: "2 ans",
            classe: "bts"
        },
        {
            id: 15,
            title: "BTS en Maintenance des Systèmes Informatiques",
            image: "https://readdy.ai/api/search-image?query=IT%20students%20working%20on%20hardware%2C%20networks%2C%20system%20maintenance%20labs%2C%20technical%20training&width=400&height=250&orientation=landscape",
            description: "Installation, maintenance et sécurisation des systèmes informatiques.",
            duration: "2 ans",
            classe: "bts"
        },
        {
            id: 16,
            title: "BTS en Entrepreneuriat Agropastoral",
            image: "https://readdy.ai/api/search-image?query=Agro%20entrepreneurship%20students%2C%20agricultural%20innovation%2C%20farm%20business%2C%20cooperative%20projects&width=400&height=250&orientation=landscape",
            description: "Création et gestion de projets agropastoraux durables.",
            duration: "2 ans",
            classe: "bts"
        },
        {
            id: 17,
            title: "BTS en Hôtellerie et Restauration",
            image: "https://readdy.ai/api/search-image?query=Hospitality%20management%20students%2C%20restaurant%20training%2C%20hotel%20operations%2C%20guest%20service%20skills&width=400&height=250&orientation=landscape",
            description: "Formation pratique en gestion hôtelière et service restauration.",
            duration: "2 ans",
            classe: "bts"
        },
        {
            id: 18,
            title: "BTS en Soins Infirmiers",
            image: "https://readdy.ai/api/search-image?query=Nursing%20students%20in%20clinical%20training%2C%20patient%20care%2C%20hospital%20simulation%20labs&width=400&height=250&orientation=landscape",
            description: "Formation en soins, hygiène, et accompagnement médical.",
            duration: "2 ans",
            classe: "bts"
        },
        {
            id: 19,
            title: "BTS en Technique de Laboratoire",
            image: "https://readdy.ai/api/search-image?query=Medical%20lab%20students%2C%20microscope%20work%2C%20blood%20tests%2C%20lab%20safety%20training%2C%20clean%20environment&width=400&height=250&orientation=landscape",
            description: "Techniques de prélèvement, analyse et gestion des laboratoires.",
            duration: "2 ans",
            classe: "bts"
        },
        {
            id: 20,
            title: "BTS en Kinésithérapie",
            image: "https://readdy.ai/api/search-image?query=Physiotherapy%20students%2C%20rehabilitation%20exercises%2C%20therapy%20equipment%2C%20clinical%20practice&width=400&height=250&orientation=landscape",
            description: "Méthodes de rééducation et de réadaptation fonctionnelle.",
            duration: "2 ans",
            classe: "bts"
        },
        {
            id: 21,
            title: "BTS en Électrotechnique",
            image: "https://readdy.ai/api/search-image?query=Electrotechnics%20students%2C%20electrical%20circuit%20labs%2C%20hands-on%20training%2C%20industrial%20equipment&width=400&height=250&orientation=landscape",
            description: "Étude des systèmes électriques, machines et automatismes.",
            duration: "2 ans",
            classe: "bts"
        },
        {
            id: 22,
            title: "BTS en Informatique Industrielle",
            image: "https://readdy.ai/api/search-image?query=Industrial%20IT%20students%2C%20automation%2C%20embedded%20systems%2C%20robotics%2C%20smart%20machines&width=400&height=250&orientation=landscape",
            description: "Automatisation, programmation industrielle et systèmes embarqués.",
            duration: "2 ans",
            classe: "bts"
        },
        {
            id: 23,
            title: "BTS en Génie Civil (option Bâtiment)",
            image: "https://readdy.ai/api/search-image?query=Civil%20engineering%20students%2C%20building%20design%2C%20construction%20planning%2C%20technical%20drawings&width=400&height=250&orientation=landscape",
            description: "Conception et réalisation de bâtiments, matériaux et topographie.",
            duration: "2 ans",
            classe: "bts"
        },
        {
            id: 24,
            title: "BTS in Accounting",
            image: "https://readdy.ai/api/search-image?query=Accounting%20students%2C%20financial%20reports%2C%20budgeting%2C%20bookkeeping%20tools&width=400&height=250&orientation=landscape",
            description: "Fundamentals of accounting, bookkeeping and financial analysis.",
            duration: "2 years",
            classe: "bts"
        },
        {
            id: 25,
            title: "BTS in Banking and Finance",
            image: "https://readdy.ai/api/search-image?query=Banking%20and%20finance%20students%2C%20investment%20strategy%2C%20financial%20planning%2C%20modern%20finance%20lab&width=400&height=250&orientation=landscape",
            description: "Banking operations, financial markets and investment management.",
            duration: "2 years",
            classe: "bts"
        },
        {
            id: 26,
            title: "BTS in Software Engineering",
            image: "https://readdy.ai/api/search-image?query=Software%20engineering%20students%2C%20coding%20projects%2C%20development%20teams%2C%20agile%20methodology%2C%20modern%20workspace&width=400&height=250&orientation=landscape",
            description: "Software design, development, testing and deployment.",
            duration: "2 years",
            classe: "bts"
        },
        {
            id: 27,
            title: "BTS in Nursing",
            image: "https://readdy.ai/api/search-image?query=Nursing%20students%20clinical%20skills%20training%2C%20healthcare%20environment%2C%20medical%20equipment&width=400&height=250&orientation=landscape",
            description: "Nursing care techniques and patient support in clinical settings.",
            duration: "2 years",
            classe: "bts"
        },
        {
            id: 28,
            title: "BTS in Medical Laboratory Science",
            image: "https://readdy.ai/api/search-image?query=Medical%20lab%20science%20students%2C%20clinical%20tests%2C%20diagnostic%20labs%2C%20microscope%20equipment&width=400&height=250&orientation=landscape",
            description: "Clinical diagnostics, lab analysis and health testing techniques.",
            duration: "2 years",
            classe: "bts"
        },
        {
            id: 29,
            title: "BTS in Logistic and Transport Management",
            image: "https://readdy.ai/api/search-image?query=Transport%20management%20students%2C%20logistics%20planning%2C%20supply%20chains%2C%20distribution%20networks&width=400&height=250&orientation=landscape",
            description: "Transport systems, logistics coordination and supply chain management.",
            duration: "2 years",
            classe: "bts"
        }
    ],
    licence: [
        {
            id: 30,
            title: "Licence en Comptabilité / Fiscalité",
            image: "https://readdy.ai/api/search-image?query=Students%20learning%20accounting%20and%20taxation%2C%20financial%20reports%2C%20tax%20laws%2C%20university%20classroom&width=400&height=250&orientation=landscape",
            description: "Maîtrise des principes comptables, de la fiscalité et de la gestion financière.",
            duration: "3 ans",
            classe: "licence"
        },
        {
            id: 31,
            title: "Licence en Banque et Finance",
            image: "https://readdy.ai/api/search-image?query=Banking%20and%20finance%20students%2C%20investment%2C%20corporate%20finance%2C%20stock%20market%2C%20finance%20classroom&width=400&height=250&orientation=landscape",
            description: "Techniques bancaires, gestion financière, marchés monétaires et crédits.",
            duration: "3 ans",
            classe: "licence"
        },
        {
            id: 32,
            title: "Licence en Audit",
            image: "https://readdy.ai/api/search-image?query=Audit%20training%2C%20internal%20control%2C%20financial%20review%2C%20risk%20assessment%2C%20students%20auditing%20case%20studies&width=400&height=250&orientation=landscape",
            description: "Fondamentaux de l’audit financier, contrôle interne et analyse des risques.",
            duration: "3 ans",
            classe: "licence"
        },
        {
            id: 33,
            title: "Licence en Automatisme et Informatique LX-DUS",
            image: "https://readdy.ai/api/search-image?query=Automation%20and%20computer%20engineering%20students%2C%20robotics%2C%20industrial%20systems%2C%20PLC%2C%20programming&width=400&height=250&orientation=landscape",
            description: "Bases de l'automatisation industrielle et de l'informatique embarquée.",
            duration: "3 ans",
            classe: "licence"
        },
        {
            id: 34,
            title: "Licence en Électrotechnique",
            image: "https://readdy.ai/api/search-image?query=Electrical%20engineering%20students%2C%20power%20systems%2C%20motors%2C%20control%20panels%2C%20technical%20training&width=400&height=250&orientation=landscape",
            description: "Études sur les systèmes électriques, installations et équipements industriels.",
            duration: "3 ans",
            classe: "licence"
        },
        {
            id: 35,
            title: "Licence en Production Animale",
            image: "https://readdy.ai/api/search-image?query=Animal%20production%20students%2C%20livestock%20farming%2C%20veterinary%20sciences%2C%20rural%20training%20center&width=400&height=250&orientation=landscape",
            description: "Techniques d’élevage, alimentation animale et santé vétérinaire.",
            duration: "3 ans",
            classe: "licence"
        },
        {
            id: 36,
            title: "Licence en Production Végétale",
            image: "https://readdy.ai/api/search-image?query=Plant%20production%20students%2C%20agronomy%2C%20crop%20management%2C%20greenhouses%2C%20sustainable%20agriculture&width=400&height=250&orientation=landscape",
            description: "Techniques agricoles, cultures vivrières et protection des plantes.",
            duration: "3 ans",
            classe: "licence"
        },
        {
            id: 37,
            title: "Licence en Génie Rural",
            image: "https://readdy.ai/api/search-image?query=Rural%20engineering%20students%2C%20irrigation%20systems%2C%20agricultural%20infrastructure%2C%20mechanized%20farming&width=400&height=250&orientation=landscape",
            description: "Infrastructures agricoles, irrigation, gestion des ressources rurales.",
            duration: "3 ans",
            classe: "licence"
        }
    ],
    master: [
        {
            id: 38,
            title: "Master en Comptabilité / Fiscalité",
            image: "https://readdy.ai/api/search-image?query=Advanced%20accounting%20students%2C%20tax%20strategy%2C%20corporate%20finance%2C%20audit%20planning&width=400&height=250&orientation=landscape",
            description: "Expertise comptable avancée, optimisation fiscale et normes IFRS.",
            duration: "2 ans",
            classe: "master"
        },
        {
            id: 39,
            title: "Master en Banque et Finance",
            image: "https://readdy.ai/api/search-image?query=Postgraduate%20finance%20students%2C%20portfolio%20management%2C%20investment%20banking%2C%20risk%20analysis&width=400&height=250&orientation=landscape",
            description: "Finance internationale, analyse des risques et gestion de portefeuille.",
            duration: "2 ans",
            classe: "master"
        },
        {
            id: 40,
            title: "Master en Audit",
            image: "https://readdy.ai/api/search-image?query=Graduate%20audit%20training%2C%20corporate%20governance%2C%20internal%20control%2C%20forensic%20audit&width=400&height=250&orientation=landscape",
            description: "Audit interne, forensic audit et audit des systèmes d'information.",
            duration: "2 ans",
            classe: "master"
        },
        {
            id: 41,
            title: "Master en Automatisme et Informatique LX-DUS",
            image: "https://readdy.ai/api/search-image?query=Advanced%20automation%20engineering%2C%20PLC%2C%20robotics%2C%20cyber-physical%20systems%2C%20graduate%20lab&width=400&height=250&orientation=landscape",
            description: "Conception de systèmes automatisés intelligents et informatique industrielle avancée.",
            duration: "2 ans",
            classe: "master"
        },
        {
            id: 42,
            title: "Master en Électrotechnique",
            image: "https://readdy.ai/api/search-image?query=Electrical%20engineering%20graduates%2C%20power%20systems%20design%2C%20renewable%20energy%2C%20industrial%20automation&width=400&height=250&orientation=landscape",
            description: "Distribution d'énergie, énergies renouvelables et automatismes industriels.",
            duration: "2 ans",
            classe: "master"
        },
        {
            id: 43,
            title: "Master en Production Animale",
            image: "https://readdy.ai/api/search-image?query=Graduate%20students%20in%20animal%20science%2C%20veterinary%20medicine%2C%20animal%20nutrition%2C%20livestock%20research&width=400&height=250&orientation=landscape",
            description: "Nutrition animale, reproduction, gestion sanitaire et production intensive.",
            duration: "2 ans",
            classe: "master"
        },
        {
            id: 44,
            title: "Master en Production Végétale",
            image: "https://readdy.ai/api/search-image?query=Graduate%20students%20in%20plant%20science%2C%20genetic%20improvement%2C%20plant%20pathology%2C%20sustainable%20crops&width=400&height=250&orientation=landscape",
            description: "Biotechnologies végétales, phytopathologie et innovations agricoles durables.",
            duration: "2 ans",
            classe: "master"
        },
        {
            id: 45,
            title: "Master en Génie Rural",
            image: "https://readdy.ai/api/search-image?query=Graduate%20rural%20engineering%2C%20hydraulic%20infrastructure%2C%20sustainable%20land%20management%2C%20agricultural%20engineering&width=400&height=250&orientation=landscape",
            description: "Hydraulique agricole, équipements ruraux, et aménagement du territoire.",
            duration: "2 ans",
            classe: "master"
        }
    ]
};


export const etapeCand = [
    {
        step: 1,
        title: "Dépôt du dossier de candidature en ligne",
        description: "Formulaire de candidature, CV, lettre de motivation, relevés de notes, diplômes, certifications linguistiques, lettres de recommandation.",
        date: "Avant le 30 avril 2025"
    },
    {
        step: 2,
        title: "Étude du dossier par le comité de sélection",
        description: "Évaluation des résultats académiques, du parcours, des motivations et du potentiel du candidat.",
        date: "Mai 2025"
    },
    {
        step: 3,
        title: "Entretien de motivation (pour les candidats présélectionnés)",
        description: "Entretien en français et en anglais pour évaluer les motivations, les connaissances et le projet professionnel.",
        date: "Juin 2025"
    },
    {
        step: 4,
        title: "Résultats d'admission",
        description: "Communication des décisions d'admission par email et sur la plateforme de candidature.",
        date: "Fin juin 2025"
    },
    {
        step: 5,
        title: "Confirmation d'inscription",
        description: "Confirmation de l'inscription et paiement des frais de scolarité (premier versement).",
        date: "Avant le 15 juillet 2025"
    }
]

export const faqs = [
    {
        question: "Puis-je candidater si ma licence n'est pas en relations internationales ?",
        answer: "Oui, nous acceptons les candidatures d'étudiants issus de diverses disciplines (droit, économie, histoire, langues, etc.) à condition que vous démontriez votre intérêt et vos connaissances dans le domaine des relations internationales."
    },
    {
        question: "Est-il possible d'intégrer directement la deuxième année (M2) ?",
        answer: "Dans certains cas exceptionnels, les étudiants ayant déjà validé une première année de Master dans un domaine proche peuvent candidater directement en M2, sous réserve d'équivalence des acquis et après étude approfondie du dossier."
    },
    {
        question: "Les entretiens peuvent-ils se faire à distance ?",
        answer: "Oui, pour les candidats résidant à l'étranger ou dans l'impossibilité de se déplacer, les entretiens peuvent être organisés par visioconférence."
    },
    {
        question: "Quelles sont mes chances d'obtenir une bourse ?",
        answer: "Environ 30% de nos étudiants bénéficient d'une aide financière. Les bourses d'excellence sont attribuées aux candidats présentant un dossier académique exceptionnel, tandis que les bourses sur critères sociaux dépendent de votre situation financière."
    },
    {
        question: "Proposez-vous un accompagnement pour le logement ?",
        answer: "Oui, notre service logement peut vous aider à trouver un hébergement adapté à votre budget, que ce soit en résidence universitaire ou dans le parc privé. Nous disposons également d'un nombre limité de chambres dans notre résidence sur le campus."
    }
]

export const programmeAnnee = [
    {
        date: "15 janvier 2025",
        event: "Ouverture des candidatures",
        icon: "fas fa-door-open"
    },
    {
        date: "30 avril 2025",
        event: "Date limite de dépôt des dossiers",
        icon: "fas fa-calendar-times"
    },
    {
        date: "15-30 juin 2025",
        event: "Entretiens de sélection",
        icon: "fas fa-comments"
    },
    {
        date: "30 juin 2025",
        event: "Publication des résultats d'admission",
        icon: "fas fa-clipboard-check"
    },
    {
        date: "15 juillet 2025",
        event: "Date limite de confirmation d'inscription",
        icon: "fas fa-user-check"
    },
    {
        date: "2 septembre 2025",
        event: "Rentrée académique",
        icon: "fas fa-university"
    }
]


export const activities = [
    {
        title: "Associations étudiantes",
        image: "https://readdy.ai/api/search-image?query=Diverse%20student%20group%20meeting%20in%20campus%20lounge%2C%20planning%20student%20association%20activities%2C%20casual%20atmosphere%2C%20engaged%20discussion%2C%20modern%20university%20interior%2C%20bright%20natural%20lighting%2C%20clean%20minimalist%20background&width=400&height=300&seq=17&orientation=landscape",
        description: "Plus de 30 associations étudiantes pour développer vos passions et enrichir votre parcours universitaire."
    },
    {
        title: "Sport et bien-être",
        image: "https://readdy.ai/api/search-image?query=University%20sports%20facilities%20with%20students%20exercising%2C%20modern%20gym%20equipment%2C%20fitness%20activities%2C%20healthy%20lifestyle%2C%20bright%20lighting%2C%20active%20atmosphere&width=400&height=300&seq=18&orientation=landscape",
        description: "Installations sportives modernes et programmes de bien-être pour maintenir un équilibre sain entre études et vie personnelle."
    },
    {
        title: "Événements culturels",
        image: "https://readdy.ai/api/search-image?query=University%20cultural%20event%20with%20students%20attending%20performance%2C%20auditorium%20setting%2C%20artistic%20atmosphere%2C%20engaged%20audience%2C%20stage%20lighting&width=400&height=300&seq=19&orientation=landscape",
        description: "Concerts, théâtre, expositions et festivals culturels organisés tout au long de l'année académique."
    },
    {
        title: "Projets communautaires",
        image: "https://readdy.ai/api/search-image?query=Students%20volunteering%20in%20community%20service%20project%2C%20teamwork%2C%20helping%20others%2C%20outdoor%20activity%2C%20social%20responsibility%2C%20positive%20impact&width=400&height=300&seq=20&orientation=landscape",
        description: "Initiatives de service communautaire et projets d'engagement social pour faire une différence positive."
    }
];

export const testimonials = [
    {
        name: "Sophie Dubois",
        program: "Master en Relations Internationales",
        year: "2ème année",
        avatar: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20female%20graduate%20student%20with%20confident%20expression%2C%20neutral%20background%2C%20professional%20lighting%2C%20academic%20context&width=100&height=100&seq=22&orientation=squarish",
        testimonial: "L'IUJP2 m'a offert bien plus qu'une formation académique d'excellence. J'ai pu développer mon leadership à travers les associations étudiantes et créer des liens durables avec des étudiants du monde entier."
    },
    {
        name: "Marc Kouassi",
        program: "Licence en Sciences Politiques",
        year: "3ème année",
        avatar: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20male%20university%20student%2C%20friendly%20smile%2C%20academic%20setting%2C%20natural%20lighting%2C%20confident%20expression&width=100&height=100&seq=23&orientation=squarish",
        testimonial: "Les opportunités de stage et les connexions avec les professionnels du secteur m'ont permis de construire un réseau solide avant même la fin de mes études."
    },
    {
        name: "Fatima Al-Rashid",
        program: "Master en Développement Durable",
        year: "1ère année",
        avatar: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20female%20international%20student%2C%20warm%20smile%2C%20multicultural%20academic%20environment%2C%20professional%20portrait&width=100&height=100&seq=24&orientation=squarish",
        testimonial: "L'approche interculturelle de l'institut et la diversité des étudiants ont enrichi ma perspective sur les enjeux mondiaux de développement durable."
    }
];

export type News = {
    _id: string;
    title: string;
    image: string;
    description: string;
    content: string;
    date: string;
    readTime: string;
    category: string;
}

export const news: News[] = [
    {
        _id: "1",
        title: "Lancement du nouveau programme de Master en Intelligence Artificielle",
        date: "2025-01-15",
        readTime: "2 min de lecture",
        category: "Technologie",
        image: "https://readdy.ai/api/search-image?query=A%20prestigious%20university%20campus%20with%20modern%20architecture%2C%20beautiful%20gardens%2C%20students%20walking%20between%20buildings%2C%20soft%20natural%20lighting%2C%20elegant%20academic%20atmosphere%2C%20high-quality%20professional%20photography%2C%20wide%20angle%20view%2C%20clear%20blue%20sky%2C%20inspiring%20educational%20environment&width=1440&height=600&seq=1&orientation=landscape",
        description: "L'Institut Universitaire Jean-Paul II annonce le lancement de son nouveau programme de Master en Intelligence Artificielle, visant à former les leaders de demain dans ce domaine en pleine expansion.",
        content: "L'Institut Universitaire Jean-Paul II est fier d'annoncer le lancement de son nouveau programme de Master en Intelligence Artificielle. Ce programme innovant vise à former les futurs experts en IA, avec un curriculum axé sur les dernières avancées technologiques et les applications pratiques dans divers secteurs. Les étudiants auront l'opportunité de travailler sur des projets réels et de collaborer avec des entreprises leaders dans le domaine de l'IA. Pour l'occasion de ce lancement, une conférence inaugurale sera organisée le 15 février 2025, avec la participation d'experts internationaux en IA. Les inscriptions sont ouvertes dès maintenant pour les candidats intéressés. Il est recommandé de postuler rapidement, car les places sont limitées. Pour plus d'informations sur le programme et les modalités d'inscription, veuillez consulter notre site web ou contacter le service des admissions. Nous sommes impatients d'accueillir la prochaine génération de leaders en intelligence artificielle à l'IUJP2. "
    },
    {
        _id: "2",
        title: "Conférence internationale sur le développement durable",
        date: "2025-02-20",
        readTime: "3 min de lecture",
        category: "Environnement",
        image: "https://readdy.ai/api/search-image?query=A%20prestigious%20university%20campus%20with%20modern%20architecture%2C%20beautiful%20gardens%2C%20students%20walking%20between%20buildings%2C%20soft%20natural%20lighting%2C%20elegant%20academic%20atmosphere%2C%20high-quality%20professional%20photography%2C%20wide%20angle%20view%2C%20clear%20blue%20sky%2C%20inspiring%20educational%20environment&width=1440&height=600&seq=1&orientation=landscape",
        description: "L'IUJP2 organise une conférence internationale réunissant des experts en développement durable pour discuter des enjeux environnementaux actuels.",
        content: "L'Institut Universitaire Jean-Paul II est ravi d'annoncer l'organisation d'une conférence internationale sur le développement durable, prévue pour le 20 mars 2025. Cet événement réunira des experts, des chercheurs et des praticiens du monde entier pour discuter des défis environnementaux actuels et des solutions innovantes. La conférence comprendra des panels de discussion, des ateliers interactifs et des présentations de recherche. Les participants auront l'occasion de partager leurs expériences et de collaborer sur des projets visant à promouvoir la durabilité. L'événement est ouvert à tous les étudiants, chercheurs et professionnels intéressés par les questions environnementales. Les inscriptions sont gratuites mais obligatoires, et les places sont limitées. Pour vous inscrire et obtenir plus d'informations sur le programme, veuillez visiter notre site web ou contacter le secrétariat de la conférence."
    },
    {
        _id: "3",
        title: "Journée portes ouvertes de l'IUJP2",
        date: "2025-03-10",
        readTime: "1 min de lecture",
        category: "Technologie",
        image: "https://readdy.ai/api/search-image?query=A%20prestigious%20university%20campus%20with%20modern%20architecture%2C%20beautiful%20gardens%2C%20students%20walking%20between%20buildings%2C%20soft%20natural%20lighting%2C%20elegant%20academic%20atmosphere%2C%20high-quality%20professional%20photography%2C%20wide%20angle%20view%2C%20clear%20blue%20sky%2C%20inspiring%20educational%20environment&width=1440&height=600&seq=1&orientation=landscape",
        description: "Venez découvrir l'Institut Universitaire Jean-Paul II lors de notre journée portes ouvertes le 10 avril 2025.",
        content: "L'Institut Universitaire Jean-Paul II invite tous les futurs étudiants à sa journée portes ouvertes le 10 avril 2025. Cet événement est l'occasion idéale pour découvrir nos programmes académiques, rencontrer nos enseignants et visiter nos installations modernes. Des visites guidées du campus seront organisées tout au long de la journée, ainsi que des présentations sur les différents cursus proposés. Les visiteurs pourront également échanger avec des étudiants actuels pour en savoir plus sur la vie à l'IUJP2. L'entrée est gratuite et ouverte à tous, sans inscription préalable. Nous vous attendons nombreux pour partager un moment convivial et informatif sur notre institut."
    }
]