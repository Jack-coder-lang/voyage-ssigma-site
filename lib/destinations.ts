// Assurons-nous que destinations est correctement exporté
export type Destination = {
  id: string
  name: string
  country: string
  region: string
  price: number
  currency: string
  rating: number
  image: string
  tagline: string
  description: string
  longDescription: string
  features: string[]
  popular: boolean
  trending: boolean
  deals: boolean
  relatedDestinations: string[]
  practicalInfo: {
    bestTimeToVisit: string
    language: string
    currency: string
    timeZone: string
    climate: string
  }
  attractions: {
    name: string
    description: string
    imageUrl: string
  }[]
  testimonials: {
    name: string
    avatar: string
    comment: string
    rating: number
    date: string
  }[]
  gallery: string[]
}

// Exportation explicite des destinations avec toutes les données nécessaires
export const destinations: Destination[] = [
  {
    id: "paris-france",
    name: "Paris",
    country: "France",
    region: "Europe",
    price: 1200,
    currency: "EUR",
    rating: 4.8,
    image: "/paris.jpg?height=400&width=600",
    tagline: "La ville de l'amour et des lumières",
    description:
      "Découvrez la magie de Paris avec ses monuments emblématiques, sa gastronomie raffinée et son atmosphère romantique.",
    longDescription:
      "Paris, la capitale de la France, est une ville emblématique connue pour ses monuments historiques, ses musées de renommée mondiale, sa gastronomie raffinée et son atmosphère romantique.",
    features: ["Tour Eiffel", "Musée du Louvre", "Cathédrale Notre-Dame", "Montmartre", "Croisière sur la Seine"],
    popular: true,
    trending: true,
    deals: false,
    relatedDestinations: ["rome-italie", "barcelone-espagne", "london-uk"],
    practicalInfo: {
      bestTimeToVisit: "Printemps (avril-juin) et automne (septembre-octobre)",
      language: "Français",
      currency: "Euro (€)",
      timeZone: "GMT+1",
      climate: "Tempéré, avec des étés chauds et des hivers frais",
    },
    attractions: [
      {
        name: "Tour Eiffel",
        description: "Le monument emblématique de Paris, offrant une vue panoramique sur la ville.",
        imageUrl: "/paris.jpg?height=300&width=400",
      },
      {
        name: "Musée du Louvre",
        description: "L'un des plus grands musées du monde, abritant des chefs-d'œuvre comme la Joconde.",
        imageUrl: "/musée.jpg?height=300&width=400",
      },
    ],
    testimonials: [
      {
        name: "Sophie Dubois",
        avatar: "/placeholder.svg?height=100&width=100",
        comment:
          "Notre séjour à Paris était magique ! La visite guidée de la Tour Eiffel et la croisière sur la Seine étaient des moments inoubliables.",
        rating: 5,
        date: "15 mai 2023",
      },
    ],
    gallery: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
  },
  {
    id: "bali-indonesie",
    name: "Bali",
    country: "Indonésie",
    region: "Asie",
    price: 1500,
    currency: "EUR",
    rating: 4.7,
    image: "/bali.jpg?height=400&width=600",
    tagline: "L'île des dieux",
    description:
      "Explorez les plages paradisiaques, les rizières en terrasses et les temples sacrés de cette île enchanteresse.",
    longDescription:
      "Bali, surnommée l'île des dieux, est une destination de rêve en Indonésie. Cette île tropicale offre un mélange parfait de culture traditionnelle, de paysages naturels époustouflants et de plages paradisiaques.",
    features: ["Plage de Kuta", "Temples d'Uluwatu", "Rizières de Tegallalang", "Mont Batur", "Ubud"],
    popular: true,
    trending: true,
    deals: true,
    relatedDestinations: ["maldives", "phuket-thailande", "tokyo-japon"],
    practicalInfo: {
      bestTimeToVisit: "Mai à septembre (saison sèche)",
      language: "Indonésien (Bahasa Indonesia) et Balinais",
      currency: "Roupie indonésienne (IDR)",
      timeZone: "GMT+8",
      climate: "Tropical, chaud et humide toute l'année",
    },
    attractions: [
      {
        name: "Temple de Tanah Lot",
        description: "Temple hindou spectaculaire perché sur un rocher au milieu de l'océan.",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
    ],
    testimonials: [
      {
        name: "Marie Leroy",
        avatar: "/placeholder.svg?height=100&width=100",
        comment: "Bali est un véritable paradis !",
        rating: 5,
        date: "20 juillet 2023",
      },
    ],
    gallery: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
  },
  {
    id: "new-york-usa",
    name: "New York",
    country: "États-Unis",
    region: "Amérique du Nord",
    price: 1800,
    currency: "EUR",
    rating: 4.6,
    image: "/new-york.jpg?height=400&width=600",
    tagline: "La ville qui ne dort jamais",
    description:
      "Vivez l'effervescence de la Big Apple avec ses gratte-ciels impressionnants, ses quartiers animés et sa diversité culturelle.",
    longDescription:
      "New York, la plus grande ville des États-Unis, est un centre mondial pour la finance, la culture, la mode et le divertissement. Cette métropole dynamique offre une expérience urbaine incomparable.",
    features: ["Times Square", "Central Park", "Statue de la Liberté", "Empire State Building", "Broadway"],
    popular: true,
    trending: false,
    deals: false,
    relatedDestinations: ["san-francisco-usa", "chicago-usa", "boston-usa"],
    practicalInfo: {
      bestTimeToVisit: "Avril-juin et septembre-novembre",
      language: "Anglais",
      currency: "Dollar américain (USD)",
      timeZone: "GMT-5",
      climate: "Continental, avec quatre saisons distinctes",
    },
    attractions: [
      {
        name: "Empire State Building",
        description: "Gratte-ciel emblématique offrant une vue panoramique sur la ville depuis son observatoire.",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
    ],
    testimonials: [
      {
        name: "Pierre Moreau",
        avatar: "/placeholder.svg?height=100&width=100",
        comment: "New York est incroyable !",
        rating: 5,
        date: "10 octobre 2023",
      },
    ],
    gallery: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
  },
  {
    id: "tokyo-japon",
    name: "Tokyo",
    country: "Japon",
    region: "Asie",
    price: 1700,
    currency: "EUR",
    rating: 4.9,
    image: "/tokyo.jpg?height=400&width=600",
    tagline: "Tradition et modernité en harmonie",
    description:
      "Plongez dans le contraste fascinant entre tradition ancestrale et technologie futuriste dans cette métropole vibrante.",
    longDescription:
      "Tokyo, capitale du Japon, est une métropole fascinante qui mélange harmonieusement traditions ancestrales et innovations futuristes. Cette ville offre une expérience culturelle unique.",
    features: ["Tour de Tokyo", "Quartier de Shibuya", "Temple Senso-ji", "Parc Ueno", "Quartier d'Akihabara"],
    popular: true,
    trending: true,
    deals: false,
    relatedDestinations: ["kyoto-japon", "seoul-coree", "hong-kong"],
    practicalInfo: {
      bestTimeToVisit: "Mars-avril (cerisiers en fleurs) et octobre-novembre (feuilles d'automne)",
      language: "Japonais",
      currency: "Yen japonais (JPY)",
      timeZone: "GMT+9",
      climate: "Tempéré avec quatre saisons distinctes",
    },
    attractions: [
      {
        name: "Temple Senso-ji",
        description: "Plus ancien temple bouddhiste de Tokyo, situé dans le quartier d'Asakusa.",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
    ],
    testimonials: [
      {
        name: "Lucas Martin",
        avatar: "/placeholder.svg?height=100&width=100",
        comment: "Tokyo est une ville incroyable !",
        rating: 5,
        date: "5 avril 2023",
      },
    ],
    gallery: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
  },
  {
    id: "santorini-grece",
    name: "Santorin",
    country: "Grèce",
    region: "Europe",
    price: 1400,
    currency: "EUR",
    rating: 4.8,
    image: "/grece.jpg?height=400&width=600",
    tagline: "L'île aux maisons blanches et bleues",
    description:
      "Admirez les vues spectaculaires sur la mer Égée depuis les falaises vertigineuses de cette île volcanique pittoresque.",
    longDescription:
      "Santorin, joyau des Cyclades en Grèce, est célèbre pour ses maisons blanches aux toits bleus perchées sur des falaises volcaniques surplombant la mer Égée.",
    features: ["Oia", "Plage rouge", "Fira", "Coucher de soleil à Imerovigli", "Site archéologique d'Akrotiri"],
    popular: true,
    trending: true,
    deals: true,
    relatedDestinations: ["mykonos-grece", "crete-grece", "amalfi-italie"],
    practicalInfo: {
      bestTimeToVisit: "Mai-juin et septembre-octobre",
      language: "Grec",
      currency: "Euro (€)",
      timeZone: "GMT+2",
      climate: "Méditerranéen, étés chauds et secs, hivers doux",
    },
    attractions: [
      {
        name: "Oia",
        description:
          "Village pittoresque connu pour ses maisons blanches, ses églises à dômes bleus et ses couchers de soleil spectaculaires.",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
    ],
    testimonials: [
      {
        name: "Julie Blanc",
        avatar: "/placeholder.svg?height=100&width=100",
        comment: "Santorin est un rêve devenu réalité !",
        rating: 5,
        date: "15 juin 2023",
      },
    ],
    gallery: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
  },
  {
    id: "marrakech-maroc",
    name: "Marrakech",
    country: "Maroc",
    region: "Afrique",
    price: 900,
    currency: "EUR",
    rating: 4.5,
    image: "/marrakech.jpg?height=400&width=600",
    tagline: "La ville rouge aux mille et une nuits",
    description:
      "Perdez-vous dans les souks colorés, découvrez des palais somptueux et savourez la cuisine marocaine authentique.",
    longDescription:
      "Marrakech, surnommée la ville rouge, est une destination fascinante au Maroc qui éveille tous les sens avec ses souks animés, ses palais majestueux et ses jardins luxuriants.",
    features: ["Place Jemaa el-Fna", "Jardin Majorelle", "Palais Bahia", "Médina", "Les souks"],
    popular: false,
    trending: true,
    deals: true,
    relatedDestinations: ["fes-maroc", "casablanca-maroc", "cairo-egypte", "dakar-senegal"],
    practicalInfo: {
      bestTimeToVisit: "Mars-mai et septembre-novembre",
      language: "Arabe et berbère (français largement parlé)",
      currency: "Dirham marocain (MAD)",
      timeZone: "GMT+1",
      climate: "Semi-aride, étés très chauds, hivers doux",
    },
    attractions: [
      {
        name: "Place Jemaa el-Fna",
        description: "Place emblématique au cœur de la médina, animée de jour comme de nuit par diverses activités.",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
    ],
    testimonials: [
      {
        name: "Nathalie Roux",
        avatar: "/placeholder.svg?height=100&width=100",
        comment: "Marrakech est une explosion de couleurs et de saveurs !",
        rating: 5,
        date: "12 avril 2023",
      },
    ],
    gallery: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
  },
  {
    id: "rio-de-janeiro-bresil",
    name: "Rio de Janeiro",
    country: "Brésil",
    region: "Amérique du Sud",
    price: 1600,
    currency: "EUR",
    rating: 4.6,
    image: "/rio.jpg?height=400&width=600",
    tagline: "La ville merveilleuse",
    description:
      "Profitez des plages emblématiques, des paysages à couper le souffle et de l'ambiance festive de cette ville dynamique.",
    longDescription:
      "Rio de Janeiro, surnommée la 'Cidade Maravilhosa' (Ville Merveilleuse), est l'une des villes les plus spectaculaires au monde, nichée entre l'océan Atlantique, des lagunes et des montagnes verdoyantes.",
    features: ["Christ Rédempteur", "Pain de Sucre", "Plage de Copacabana", "Escalier Selarón", "Forêt de Tijuca"],
    popular: false,
    trending: false,
    deals: true,
    relatedDestinations: ["buenos-aires-argentine", "sao-paulo-bresil", "iguazu-falls"],
    practicalInfo: {
      bestTimeToVisit: "Mai à octobre (saison sèche) ou février-mars (carnaval)",
      language: "Portugais",
      currency: "Real brésilien (BRL)",
      timeZone: "GMT-3",
      climate: "Tropical, chaud et humide toute l'année",
    },
    attractions: [
      {
        name: "Christ Rédempteur",
        description: "Statue emblématique sur le mont Corcovado, offrant une vue panoramique sur la ville.",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
    ],
    testimonials: [
      {
        name: "Sophie Mercier",
        avatar: "/placeholder.svg?height=100&width=100",
        comment: "Rio est une ville incroyable !",
        rating: 5,
        date: "10 mars 2023",
      },
    ],
    gallery: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
  },
  {
    id: "sydney-australie",
    name: "Sydney",
    country: "Australie",
    region: "Océanie",
    price: 2000,
    currency: "EUR",
    rating: 4.7,
    image: "/sidney.jpg?height=400&width=600",
    tagline: "La perle de l'hémisphère sud",
    description:
      "Découvrez l'emblématique opéra, les plages magnifiques et le style de vie décontracté de cette métropole côtière.",
    longDescription:
      "Sydney, plus grande ville d'Australie, est une métropole cosmopolite nichée autour de l'un des plus beaux ports naturels du monde.",
    features: ["Opéra de Sydney", "Harbour Bridge", "Plage de Bondi", "Darling Harbour", "Taronga Zoo"],
    popular: true,
    trending: false,
    deals: false,
    relatedDestinations: ["melbourne-australie", "great-barrier-reef", "auckland-nz"],
    practicalInfo: {
      bestTimeToVisit: "Octobre à avril (printemps et été austral)",
      language: "Anglais",
      currency: "Dollar australien (AUD)",
      timeZone: "GMT+10 (GMT+11 en été)",
      climate: "Tempéré, étés chauds et hivers doux",
    },
    attractions: [
      {
        name: "Opéra de Sydney",
        description: "Chef-d'œuvre architectural emblématique, site du patrimoine mondial de l'UNESCO.",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
    ],
    testimonials: [
      {
        name: "Émilie Bertrand",
        avatar: "/placeholder.svg?height=100&width=100",
        comment: "Sydney est une ville magnifique !",
        rating: 5,
        date: "15 janvier 2023",
      },
    ],
    gallery: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    region: "Asie",
    price: 2500,
    currency: "EUR",
    rating: 4.9,
    image: "/placeholder.svg?height=400&width=600",
    tagline: "Le paradis sur terre",
    description:
      "Évadez-vous dans ce paradis tropical avec ses eaux cristallines, ses plages de sable blanc et ses bungalows sur pilotis.",
    longDescription:
      "Les Maldives sont un archipel de 1 192 îles coralliennes regroupées en 26 atolls, situé dans l'océan Indien. Cette destination de rêve offre des eaux cristallines et des plages de sable blanc.",
    features: ["Bungalows sur pilotis", "Plongée avec masque et tuba", "Récifs coralliens", "Dauphins", "Spas de luxe"],
    popular: true,
    trending: true,
    deals: false,
    relatedDestinations: ["bali-indonesie", "phuket-thailande", "seychelles"],
    practicalInfo: {
      bestTimeToVisit: "Novembre à avril (saison sèche)",
      language: "Dhivehi (anglais largement parlé)",
      currency: "Rufiyaa maldivienne (MVR)",
      timeZone: "GMT+5",
      climate: "Tropical, chaud et humide toute l'année",
    },
    attractions: [
      {
        name: "Atolls de Malé",
        description: "Atolls principaux avec des resorts de luxe et des eaux cristallines.",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
    ],
    testimonials: [
      {
        name: "Jean Dupont",
        avatar: "/placeholder.svg?height=100&width=100",
        comment: "Les Maldives sont un véritable paradis !",
        rating: 5,
        date: "20 février 2023",
      },
    ],
    gallery: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
  },
  {
    id: "rome-italie",
    name: "Rome",
    country: "Italie",
    region: "Europe",
    price: 1100,
    currency: "EUR",
    rating: 4.7,
    image: "/rome.jpg?height=400&width=600",
    tagline: "La ville éternelle",
    description:
      "Explorez les vestiges de l'Empire romain, admirez des chefs-d'œuvre artistiques et savourez la délicieuse cuisine italienne.",
    longDescription:
      "Rome, capitale de l'Italie, est une ville qui respire l'histoire à chaque coin de rue. Cette ville éternelle offre un voyage fascinant à travers les millénaires d'histoire.",
    features: ["Colisée", "Vatican", "Fontaine de Trevi", "Forum romain", "Panthéon"],
    popular: true,
    trending: false,
    deals: true,
    relatedDestinations: ["paris-france", "florence-italie", "athens-grece"],
    practicalInfo: {
      bestTimeToVisit: "Avril-mai et septembre-octobre",
      language: "Italien",
      currency: "Euro (€)",
      timeZone: "GMT+1",
      climate: "Méditerranéen",
    },
    attractions: [
      {
        name: "Colisée",
        description: "Amphithéâtre romain emblématique, témoin des combats de gladiateurs de l'Antiquité.",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
    ],
    testimonials: [
      {
        name: "Marie Lecomte",
        avatar: "/placeholder.svg?height=100&width=100",
        comment: "Rome est une ville fascinante !",
        rating: 5,
        date: "20 avril 2023",
      },
    ],
    gallery: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
  },
  {
    id: "kyoto-japon",
    name: "Kyoto",
    country: "Japon",
    region: "Asie",
    price: 1600,
    currency: "EUR",
    rating: 4.8,
    image: "/kyoto.jpg?height=400&width=600",
    tagline: "Le cœur culturel du Japon",
    description:
      "Immergez-vous dans la culture japonaise traditionnelle avec ses temples anciens, ses jardins zen et ses geishas.",
    longDescription:
      "Kyoto, ancienne capitale impériale du Japon pendant plus de mille ans, est le cœur culturel et spirituel du pays.",
    features: ["Temple Kinkaku-ji", "Forêt de bambous d'Arashiyama", "Sanctuaire Fushimi Inari", "Quartier de Gion", "Château de Nijo"],
    popular: false,
    trending: true,
    deals: false,
    relatedDestinations: ["tokyo-japon", "nara-japon", "osaka-japon"],
    practicalInfo: {
      bestTimeToVisit: "Mars-avril (cerisiers) et novembre (érables)",
      language: "Japonais",
      currency: "Yen japonais (JPY)",
      timeZone: "GMT+9",
      climate: "Tempéré avec quatre saisons distinctes",
    },
    attractions: [
      {
        name: "Temple Kinkaku-ji (Pavillon d'Or)",
        description: "Temple zen recouvert de feuilles d'or, se reflétant dans un étang paisible.",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
    ],
    testimonials: [
      {
        name: "Sophie Martin",
        avatar: "/placeholder.svg?height=100&width=100",
        comment: "Kyoto est une ville magique !",
        rating: 5,
        date: "15 avril 2023",
      },
    ],
    gallery: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
  },
  {
    id: "barcelone-espagne",
    name: "Barcelone",
    country: "Espagne",
    region: "Europe",
    price: 950,
    currency: "EUR",
    rating: 4.6,
    image: "/barcelona.jpg?height=400&width=600",
    tagline: "La perle méditerranéenne",
    description:
      "Découvrez l'architecture unique de Gaudí, les plages urbaines et la vie nocturne animée de cette ville catalane.",
    longDescription:
      "Barcelone, capitale de la Catalogne, est une ville méditerranéenne qui séduit par son mélange unique d'architecture avant-gardiste, de culture vibrante et d'ambiance décontractée.",
    features: ["Sagrada Familia", "Parc Güell", "Las Ramblas", "Quartier gothique", "Plage de Barceloneta"],
    popular: true,
    trending: true,
    deals: true,
    relatedDestinations: ["madrid-espagne", "valencia-espagne", "nice-france"],
    practicalInfo: {
      bestTimeToVisit: "Avril-juin et septembre-octobre",
      language: "Espagnol et Catalan",
      currency: "Euro (€)",
      timeZone: "GMT+1",
      climate: "Méditerranéen, étés chauds et secs, hivers doux",
    },
    attractions: [
      {
        name: "Sagrada Familia",
        description: "Basilique emblématique conçue par Gaudí, en construction depuis 1882.",
        imageUrl: "/barcelona.jpg?height=300&width=400",
      },
    ],
    testimonials: [
      {
        name: "Julie Bertrand",
        avatar: "/placeholder.svg?height=100&width=100",
        comment: "Barcelone est une ville magnifique !",
        rating: 5,
        date: "15 juin 2023",
      },
    ],
    gallery: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
  },
  {
    id: "dakar-senegal",
    name: "Dakar",
    country: "Sénégal",
    region: "Afrique",
    price: 850,
    currency: "EUR",
    rating: 4.4,
    image: "/dakar.jpg?height=400&width=600",
    tagline: "La porte de l'Afrique de l'Ouest",
    description:
      "Découvrez la vibrante capitale sénégalaise avec ses marchés colorés, sa riche histoire et ses plages atlantiques.",
    longDescription:
      "Dakar, la capitale du Sénégal, est une ville dynamique qui allie modernité et traditions africaines. Située sur la côte atlantique, elle offre des marchés animés, une scène culturelle riche et une histoire fascinante.",
    features: ["Île de Gorée", "Lac Rose", "Marché Kermel", "Monument de la Renaissance africaine", "Plage de Yoff"],
    popular: false,
    trending: true,
    deals: true,
    relatedDestinations: ["marrakech-maroc", "abidjan-cote-ivoire", "accra-ghana"],
    practicalInfo: {
      bestTimeToVisit: "Novembre à avril (saison sèche)",
      language: "Français et Wolof",
      currency: "Franc CFA (XOF)",
      timeZone: "GMT+0",
      climate: "Tropical, avec une saison sèche et une saison des pluies",
    },
    attractions: [
      {
        name: "Île de Gorée",
        description: "Île historique classée au patrimoine mondial de l'UNESCO, connue pour son rôle dans la traite des esclaves.",
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
    ],
    testimonials: [
      {
        name: "Amadou Diop",
        avatar: "/placeholder.svg?height=100&width=100",
        comment: "Dakar est une ville pleine de vie et d'histoire, un voyage inoubliable !",
        rating: 4.5,
        date: "10 novembre 2023",
      },
    ],
    gallery: ["/placeholder.svg?height=500&width=500", "/placeholder.svg?height=500&width=500"],
  },
    {
      id: "abidjan-cote-ivoire",
      name: "Abidjan",
      country: "Côte d'Ivoire",
      region: "Afrique",
      price: 900,
      currency: "EUR",
      rating: 4.3,
      image: "/Abidjan.jpg?height=400&width=600",
      tagline: "La perle des lagunes",
      description:
        "Explorez cette métropole animée avec ses gratte-ciel modernes, ses lagunes pittoresques et sa culture ivoirienne vibrante.",
      longDescription:
        "Abidjan, la capitale économique de la Côte d'Ivoire, est une ville cosmopolite surnommée la 'Perle des Lagunes'. Elle combine modernité avec ses gratte-ciel et traditions africaines avec ses marchés et sa musique zouglou.",
      features: ["Cathédrale Saint-Paul", "Marché de Treichville", "Plateau", "Forêt du Banco", "Lagune Ébrié"],
      popular: false,
      trending: false,
      deals: true,
      relatedDestinations: ["dakar-senegal", "accra-ghana", "lagos-nigeria"],
      practicalInfo: {
        bestTimeToVisit: "Novembre à mars (saison sèche)",
        language: "Français",
        currency: "Franc CFA (XOF)",
        timeZone: "GMT+0",
        climate: "Tropical humide, avec une saison sèche et une saison des pluies",
      },
      attractions: [
        {
          name: "Cathédrale Saint-Paul",
          description: "Cathédrale moderne emblématique avec une architecture unique surplombant la lagune Ébrié.",
          imageUrl: "/Abidjan.jpg?height=300&width=400",
        },
      ],
      testimonials: [
        {
          name: "Fatou Koné",
          avatar: "/placeholder.svg?height=100&width=100",
          comment: "Abidjan est une ville vibrante, pleine de surprises et de chaleur humaine !",
          rating: 4,
          date: "5 décembre 2023",
        },
      ],
      gallery: ["/Abidjan.jpg?height=500&width=500", "/Abidjan.jpg?height=500&width=500"],
    },
]

// Fonction pour obtenir toutes les régions uniques
export function getAllRegions(): string[] {
  const regions = new Set<string>()
  destinations.forEach((destination) => {
    regions.add(destination.region)
  })
  return Array.from(regions)
}

// Fonction pour obtenir toutes les destinations par région
export function getDestinationsByRegion(region: string): Destination[] {
  return destinations.filter((destination) => destination.region === region)
}

// Fonction pour obtenir une destination par ID
export function getDestinationById(id: string): Destination | undefined {
  return destinations.find((destination) => destination.id === id)
}

// Fonction pour obtenir les destinations liées
export function getRelatedDestinations(ids: string[]): Destination[] {
  if (!ids || !Array.isArray(ids)) {
    return []
  }
  return destinations.filter((destination) => ids.includes(destination.id))
}

// Fonction pour obtenir les destinations populaires
export function getPopularDestinations(limit = 6): Destination[] {
  return destinations.filter((destination) => destination.popular).slice(0, limit)
}

// Fonction pour obtenir les destinations en tendance
export function getTrendingDestinations(limit = 4): Destination[] {
  return destinations.filter((destination) => destination.trending).slice(0, limit)
}

// Fonction pour obtenir les destinations en promotion
export function getDealsDestinations(limit = 3): Destination[] {
  return destinations.filter((destination) => destination.deals).slice(0, limit)
}

// Fonction pour rechercher des destinations
export function searchDestinations(query: string): Destination[] {
  if (!query || query.trim() === "") {
    return destinations
  }

  const searchTerm = query.toLowerCase().trim()
  return destinations.filter((destination) => {
    return (
      destination.name.toLowerCase().includes(searchTerm) ||
      destination.country.toLowerCase().includes(searchTerm) ||
      destination.region.toLowerCase().includes(searchTerm) ||
      destination.description.toLowerCase().includes(searchTerm) ||
      destination.tagline.toLowerCase().includes(searchTerm) ||
      destination.features.some((feature) => feature.toLowerCase().includes(searchTerm))
    )
  })
}