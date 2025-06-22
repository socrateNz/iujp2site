export type Formation = {
    id: number;
    title: string;
    image: string;
    description: string;
    duration: string;
    classe: string;
};

export const formations = {
    licence: [
        {
            id: 1,
            title: "Licence en Sciences Économiques",
            image: "https://readdy.ai/api/search-image?query=Students%20in%20a%20modern%20economics%20lecture%20hall%2C%20attentive%20to%20professor%2C%20bright%20academic%20environment%2C%20charts%20and%20graphs%20on%20screen%2C%20diverse%20student%20body%2C%20professional%20setting%2C%20clean%20minimalist%20background&width=400&height=250&seq=3&orientation=landscape",
            description: "Formation complète en économie avec spécialisation en analyse financière et économétrie.",
            duration: "3 ans",
            classe: "licence"
        },
        {
            id: 2,
            title: "Licence en Droit",
            image: "https://readdy.ai/api/search-image?query=Law%20students%20in%20a%20classic%20university%20library%20with%20wooden%20bookshelves%2C%20legal%20volumes%2C%20students%20studying%20at%20tables%2C%20professional%20atmosphere%2C%20warm%20lighting%2C%20academic%20environment%2C%20clean%20minimalist%20background&width=400&height=250&seq=4&orientation=landscape",
            description: "Programme rigoureux couvrant les fondamentaux du droit privé, public et international.",
            duration: "3 ans",
            classe: "licence"
        },
        {
            id: 3,
            title: "Licence en Langues Étrangères Appliquées",
            image: "https://readdy.ai/api/search-image?query=International%20students%20in%20a%20language%20laboratory%20with%20headphones%2C%20interactive%20screens%2C%20diverse%20group%20practicing%20languages%2C%20modern%20technology%2C%20bright%20academic%20setting%2C%20clean%20minimalist%20background&width=400&height=250&seq=5&orientation=landscape",
            description: "Maîtrise de deux langues étrangères et leur application dans le contexte professionnel.",
            duration: "3 ans",
            classe: "licence"
        },
        {
            id: 4,
            title: "Licence en Sciences Politiques",
            image: "https://readdy.ai/api/search-image?query=Political%20science%20seminar%20with%20engaged%20students%20in%20discussion%2C%20professor%20facilitating%20debate%2C%20modern%20classroom%20with%20political%20maps%20and%20charts%2C%20diverse%20student%20body%2C%20academic%20setting%2C%20clean%20minimalist%20background&width=400&height=250&seq=6&orientation=landscape",
            description: "Analyse des systèmes politiques contemporains et des relations internationales.",
            duration: "3 ans",
            classe: "licence"
        },
        {
            id: 5,
            title: "Licence en Informatique",
            image: "https://readdy.ai/api/search-image?query=Computer%20science%20students%20working%20on%20coding%20projects%20in%20a%20high-tech%20laboratory%2C%20multiple%20screens%20with%20code%2C%20collaborative%20environment%2C%20modern%20equipment%2C%20bright%20academic%20setting%2C%20clean%20minimalist%20background&width=400&height=250&seq=7&orientation=landscape",
            description: "Formation aux fondamentaux de la programmation, des réseaux et de la sécurité informatique.",
            duration: "3 ans",
            classe: "licence"
        },
        {
            id: 6,
            title: "Licence en Communication",
            image: "https://readdy.ai/api/search-image?query=Communication%20students%20working%20on%20media%20project%20in%20a%20creative%20studio%2C%20cameras%2C%20editing%20equipment%2C%20collaborative%20atmosphere%2C%20modern%20design%20space%2C%20bright%20academic%20environment%2C%20clean%20minimalist%20background&width=400&height=250&seq=8&orientation=landscape",
            description: "Développement des compétences en communication écrite, orale et digitale.",
            duration: "3 ans",
            classe: "licence"
        }
    ],
    master: [
        {
            id: 7,
            title: "Master en Finance Internationale",
            image: "https://readdy.ai/api/search-image?query=Graduate%20students%20analyzing%20financial%20data%20on%20multiple%20screens%2C%20professional%20business%20attire%2C%20modern%20finance%20lab%2C%20global%20market%20displays%2C%20serious%20academic%20environment%2C%20clean%20minimalist%20background&width=400&height=250&seq=9&orientation=landscape",
            description: "Expertise en finance de marché, gestion de portefeuille et finance d'entreprise.",
            duration: "2 ans",
            classe: "master"
        },
        {
            id: 8,
            title: "Master en Droit des Affaires",
            image: "https://readdy.ai/api/search-image?query=Law%20students%20in%20business%20attire%20discussing%20case%20studies%20in%20modern%20seminar%20room%2C%20legal%20documents%20on%20table%2C%20professional%20atmosphere%2C%20collaborative%20discussion%2C%20academic%20setting%2C%20clean%20minimalist%20background&width=400&height=250&seq=10&orientation=landscape",
            description: "Spécialisation en droit commercial, droit des sociétés et contentieux des affaires.",
            duration: "2 ans",
            classe: "master"
        },
        {
            id: 9,
            title: "Master en Relations Internationales",
            image: "https://readdy.ai/api/search-image?query=International%20relations%20seminar%20with%20diverse%20students%2C%20world%20map%20backdrop%2C%20diplomatic%20discussion%2C%20professional%20setting%2C%20model%20United%20Nations%20style%2C%20academic%20environment%2C%20clean%20minimalist%20background&width=400&height=250&seq=11&orientation=landscape",
            description: "Analyse des enjeux géopolitiques contemporains et des organisations internationales.",
            duration: "2 ans",
            classe: "master"
        },
        {
            id: 10,
            title: "Master en Intelligence Artificielle",
            image: "https://readdy.ai/api/search-image?query=Advanced%20computer%20science%20students%20working%20with%20AI%20models%2C%20robotics%20lab%2C%20high-tech%20equipment%2C%20data%20visualizations%20on%20screens%2C%20collaborative%20research%20environment%2C%20academic%20setting%2C%20clean%20minimalist%20background&width=400&height=250&seq=12&orientation=landscape",
            description: "Formation avancée en apprentissage automatique, traitement du langage naturel et vision par ordinateur.",
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