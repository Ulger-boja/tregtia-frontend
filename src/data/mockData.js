export const MOCK_USERS = [
  { id: 'u1', name: 'Arben Krasniqi', avatar: 'https://i.pravatar.cc/150?img=11', phone: '+355 69 123 4567', userType: 'INDIVIDUAL', createdAt: '2025-06-15' },
  { id: 'u2', name: 'Elona Hoxha', avatar: 'https://i.pravatar.cc/150?img=5', phone: '+355 68 234 5678', userType: 'INDIVIDUAL', createdAt: '2025-03-20' },
  { id: 'u3', name: 'Auto Tirana SH.P.K', avatar: 'https://i.pravatar.cc/150?img=60', phone: '+355 69 345 6789', userType: 'BUSINESS', companyName: 'Auto Tirana', createdAt: '2024-11-01' },
  { id: 'u4', name: 'Dritan Leka', avatar: 'https://i.pravatar.cc/150?img=33', phone: '+355 67 456 7890', userType: 'INDIVIDUAL', createdAt: '2025-09-10' },
];

export const CATEGORIES = [
  { id: 'c1', slug: 'vehicles', name_sq: 'Automjete', name_en: 'Vehicles', icon: 'car', children: [
    { id: 'c1a', slug: 'cars', name_sq: 'Makina', name_en: 'Cars' },
    { id: 'c1b', slug: 'motorcycles', name_sq: 'Motorra', name_en: 'Motorcycles' },
    { id: 'c1c', slug: 'parts', name_sq: 'Pjesë këmbimi', name_en: 'Parts' },
  ]},
  { id: 'c2', slug: 'properties', name_sq: 'Prona', name_en: 'Properties', icon: 'home', children: [
    { id: 'c2a', slug: 'apartments', name_sq: 'Apartamente', name_en: 'Apartments' },
    { id: 'c2b', slug: 'houses', name_sq: 'Shtëpi', name_en: 'Houses' },
    { id: 'c2c', slug: 'land', name_sq: 'Tokë', name_en: 'Land' },
  ]},
  { id: 'c3', slug: 'electronics', name_sq: 'Elektronikë', name_en: 'Electronics', icon: 'smartphone', children: [
    { id: 'c3a', slug: 'phones', name_sq: 'Telefona', name_en: 'Phones' },
    { id: 'c3b', slug: 'computers', name_sq: 'Kompjutera', name_en: 'Computers' },
    { id: 'c3c', slug: 'tv-audio', name_sq: 'TV & Audio', name_en: 'TV & Audio' },
    { id: 'c3d', slug: 'gaming', name_sq: 'Gaming', name_en: 'Gaming' },
  ]},
  { id: 'c4', slug: 'furniture', name_sq: 'Mobilje', name_en: 'Furniture', icon: 'sofa', children: [
    { id: 'c4a', slug: 'living-room', name_sq: 'Dhomë ndenje', name_en: 'Living Room' },
    { id: 'c4b', slug: 'bedroom', name_sq: 'Dhomë gjumi', name_en: 'Bedroom' },
    { id: 'c4c', slug: 'kitchen', name_sq: 'Kuzhinë', name_en: 'Kitchen' },
  ]},
  { id: 'c5', slug: 'fashion', name_sq: 'Modë', name_en: 'Fashion', icon: 'shirt', children: [
    { id: 'c5a', slug: 'mens', name_sq: 'Për meshkuj', name_en: "Men's" },
    { id: 'c5b', slug: 'womens', name_sq: 'Për femra', name_en: "Women's" },
    { id: 'c5c', slug: 'shoes', name_sq: 'Këpucë', name_en: 'Shoes' },
  ]},
  { id: 'c6', slug: 'jobs', name_sq: 'Punë', name_en: 'Jobs', icon: 'briefcase', children: [
    { id: 'c6a', slug: 'full-time', name_sq: 'Kohë e plotë', name_en: 'Full-time' },
    { id: 'c6b', slug: 'part-time', name_sq: 'Kohë e pjesshme', name_en: 'Part-time' },
  ]},
  { id: 'c7', slug: 'services', name_sq: 'Shërbime', name_en: 'Services', icon: 'wrench', children: [] },
  { id: 'c8', slug: 'pets', name_sq: 'Kafshë', name_en: 'Pets', icon: 'paw-print', children: [] },
  { id: 'c9', slug: 'sports', name_sq: 'Sport', name_en: 'Sports', icon: 'dumbbell', children: [] },
  { id: 'c10', slug: 'other', name_sq: 'Të tjera', name_en: 'Other', icon: 'more-horizontal', children: [] },
];

export const CITIES = [
  'Tiranë', 'Durrës', 'Vlorë', 'Sarandë', 'Shkodër', 'Elbasan', 'Korçë', 'Berat', 'Fier', 'Pogradec', 'Lushnjë', 'Kavajë',
];

const img = (id) => `https://picsum.photos/seed/${id}/600/400`;

export const MOCK_LISTINGS = [
  // Vehicles
  { id: 'l1', title: 'Mercedes Benz C220 CDI Avantgarde', description: 'Mercedes C220 CDI, viti 2018, automatik, ngjyrë e zezë, 150,000 km. Gjendje perfekte, servisuar rregullisht. Letra në rregull, siguracion deri në Mars 2027.', price: 1850000, currency: 'ALL', city: 'Tiranë', images: [img('merc1'), img('merc2'), img('merc3')], category: CATEGORIES[0], subcategory: 'cars', user: MOCK_USERS[2], createdAt: '2026-02-27T10:00:00Z', views: 342, negotiable: true, exchange: false },
  { id: 'l2', title: 'Volkswagen Golf 7 1.6 TDI', description: 'Golf 7, viti 2015, manual, 120,000 km, ngjyrë gri. Konsum i ulët, goma të reja.', price: 1200000, currency: 'ALL', city: 'Durrës', images: [img('golf1'), img('golf2')], category: CATEGORIES[0], subcategory: 'cars', user: MOCK_USERS[0], createdAt: '2026-02-26T08:00:00Z', views: 189, negotiable: true, exchange: true },
  { id: 'l3', title: 'BMW X3 2.0d xDrive', description: 'BMW X3 xDrive, viti 2019, automatik, 80,000 km. Full optional, panoramik, kamera mbrapa.', price: 32000, currency: 'EUR', city: 'Tiranë', images: [img('bmw1'), img('bmw2'), img('bmw3'), img('bmw4')], category: CATEGORIES[0], subcategory: 'cars', user: MOCK_USERS[2], createdAt: '2026-02-25T14:00:00Z', views: 567, negotiable: false, exchange: false },
  { id: 'l4', title: 'Vespa Primavera 125cc', description: 'Vespa Primavera 125cc, viti 2022, vetëm 5,000 km. Si e re, me garanci.', price: 350000, currency: 'ALL', city: 'Vlorë', images: [img('vespa1'), img('vespa2')], category: CATEGORIES[0], subcategory: 'motorcycles', user: MOCK_USERS[1], createdAt: '2026-02-24T09:00:00Z', views: 95, negotiable: true, exchange: false },

  // Properties
  { id: 'l5', title: 'Apartament 2+1 në Bllok, Tiranë', description: 'Apartament 2+1 me sipërfaqe 85 m², kati 4 me ashensor. I mobiluar plotësisht, i rinovuar së fundmi. Ndodhet pranë bulevardit kryesor.', price: 145000, currency: 'EUR', city: 'Tiranë', images: [img('apt1'), img('apt2'), img('apt3')], category: CATEGORIES[1], subcategory: 'apartments', user: MOCK_USERS[0], createdAt: '2026-02-28T06:00:00Z', views: 423, negotiable: true, exchange: false },
  { id: 'l6', title: 'Shtëpi 3-katëshe në Sarandë', description: 'Shtëpi private 3-katëshe me pamje deti, 250 m² tokë, 180 m² ndërtim. Oborr i madh, parking.', price: 220000, currency: 'EUR', city: 'Sarandë', images: [img('house1'), img('house2'), img('house3')], category: CATEGORIES[1], subcategory: 'houses', user: MOCK_USERS[3], createdAt: '2026-02-23T11:00:00Z', views: 312, negotiable: true, exchange: false },
  { id: 'l7', title: 'Tokë 500 m² në Durrës, buzë detit', description: 'Tokë ndërtimi 500 m² në zonën e Plazhit, 200 m nga deti. Leje ndërtimi e mundshme.', price: 80000, currency: 'EUR', city: 'Durrës', images: [img('land1')], category: CATEGORIES[1], subcategory: 'land', user: MOCK_USERS[3], createdAt: '2026-02-20T15:00:00Z', views: 178, negotiable: true, exchange: false },

  // Electronics
  { id: 'l8', title: 'iPhone 15 Pro Max 256GB', description: 'iPhone 15 Pro Max, ngjyrë Titanium, 256GB. I blerë 3 muaj më parë, me kuti origjinale dhe garanci Apple.', price: 135000, currency: 'ALL', city: 'Tiranë', images: [img('iphone1'), img('iphone2')], category: CATEGORIES[2], subcategory: 'phones', user: MOCK_USERS[1], createdAt: '2026-02-28T09:00:00Z', views: 289, negotiable: false, exchange: true },
  { id: 'l9', title: 'MacBook Air M2 13"', description: 'MacBook Air M2, 8GB RAM, 256GB SSD. I përdorur vetëm për punë, gjendje perfekte.', price: 95000, currency: 'ALL', city: 'Tiranë', images: [img('mac1'), img('mac2')], category: CATEGORIES[2], subcategory: 'computers', user: MOCK_USERS[0], createdAt: '2026-02-27T16:00:00Z', views: 156, negotiable: true, exchange: false },
  { id: 'l10', title: 'Samsung TV 55" QLED 4K', description: 'Samsung QLED 55", model 2024. Me kuti dhe telekomandë. Përdorur vetëm 6 muaj.', price: 55000, currency: 'ALL', city: 'Elbasan', images: [img('tv1')], category: CATEGORIES[2], subcategory: 'tv-audio', user: MOCK_USERS[3], createdAt: '2026-02-26T12:00:00Z', views: 87, negotiable: true, exchange: false },
  { id: 'l11', title: 'PlayStation 5 + 2 kontrolla', description: 'PS5 Disc Edition me 2 kontrolla DualSense. I blerë në 2025, me kuti. Përfshihen 3 lojëra: FIFA 25, GTA V, Spider-Man 2.', price: 48000, currency: 'ALL', city: 'Tiranë', images: [img('ps51'), img('ps52')], category: CATEGORIES[2], subcategory: 'gaming', user: MOCK_USERS[0], createdAt: '2026-02-25T18:00:00Z', views: 234, negotiable: true, exchange: true },

  // Furniture
  { id: 'l12', title: 'Set divan + 2 kolltukë, lëkurë italiane', description: 'Set divani me 2 kolltukë, lëkurë e vërtetë italiane, ngjyrë kafe. Gjendje shumë e mirë.', price: 85000, currency: 'ALL', city: 'Tiranë', images: [img('sofa1'), img('sofa2')], category: CATEGORIES[3], subcategory: 'living-room', user: MOCK_USERS[1], createdAt: '2026-02-24T10:00:00Z', views: 112, negotiable: true, exchange: false },
  { id: 'l13', title: 'Krevat dopjo me dyshek ortopedik', description: 'Krevat 160x200 me dyshek ortopedik të përfshirë. Dru lisi, punë cilësore.', price: 45000, currency: 'ALL', city: 'Korçë', images: [img('bed1')], category: CATEGORIES[3], subcategory: 'bedroom', user: MOCK_USERS[3], createdAt: '2026-02-22T09:00:00Z', views: 67, negotiable: false, exchange: false },

  // Fashion
  { id: 'l14', title: 'Nike Air Max 90 - Nr. 43', description: 'Nike Air Max 90, madhësia 43, origjinale. Veshur vetëm 2 herë.', price: 12000, currency: 'ALL', city: 'Tiranë', images: [img('nike1'), img('nike2')], category: CATEGORIES[4], subcategory: 'shoes', user: MOCK_USERS[0], createdAt: '2026-02-28T07:00:00Z', views: 78, negotiable: false, exchange: true },
  { id: 'l15', title: 'Xhaketë lëkure, madhësia M', description: 'Xhaketë lëkure e zezë, madhësia M, e re me etiketë. Blerë në Milano.', price: 18000, currency: 'ALL', city: 'Durrës', images: [img('jacket1')], category: CATEGORIES[4], subcategory: 'mens', user: MOCK_USERS[1], createdAt: '2026-02-27T14:00:00Z', views: 45, negotiable: true, exchange: false },

  // Jobs
  { id: 'l16', title: 'Kërkohet programist Full-Stack', description: 'Kompania jonë kërkon programist Full-Stack me përvojë 3+ vjet. React, Node.js, PostgreSQL. Pagë konkuruese + benefite.', price: null, currency: 'ALL', city: 'Tiranë', images: [img('job1')], category: CATEGORIES[5], subcategory: 'full-time', user: MOCK_USERS[2], createdAt: '2026-02-28T08:00:00Z', views: 456, negotiable: false, exchange: false },
  { id: 'l17', title: 'Kamarier/e part-time - Restorant Blloku', description: 'Kërkohet kamarier/e për orar part-time (17:00-23:00). Përvojë e mëparshme e preferueshme.', price: 40000, currency: 'ALL', city: 'Tiranë', images: [img('job2')], category: CATEGORIES[5], subcategory: 'part-time', user: MOCK_USERS[3], createdAt: '2026-02-26T10:00:00Z', views: 189, negotiable: false, exchange: false },

  // Services
  { id: 'l18', title: 'Hidraulik profesionist - Tiranë', description: 'Ofroj shërbim hidrauliku për shtëpi dhe biznese. Riparime, instalime, mirëmbajtje. 15 vjet përvojë.', price: 3000, currency: 'ALL', city: 'Tiranë', images: [img('plumber1')], category: CATEGORIES[6], user: MOCK_USERS[3], createdAt: '2026-02-25T11:00:00Z', views: 89, negotiable: false, exchange: false },
  { id: 'l19', title: 'Mësuese private anglisht', description: 'Ofroj mësime private të anglishtes për të gjitha nivelet. Certifikatë IELTS 8.0. Online ose në person.', price: 2000, currency: 'ALL', city: 'Tiranë', images: [img('tutor1')], category: CATEGORIES[6], user: MOCK_USERS[1], createdAt: '2026-02-24T13:00:00Z', views: 134, negotiable: false, exchange: false },

  // Pets
  { id: 'l20', title: 'Qen Golden Retriever - 3 muajsh', description: 'Këlyshë Golden Retriever, 3 muaj, me vaksinime dhe pasaportë. Shumë i dashur dhe i mësuar.', price: 45000, currency: 'ALL', city: 'Tiranë', images: [img('dog1'), img('dog2')], category: CATEGORIES[7], user: MOCK_USERS[0], createdAt: '2026-02-27T09:00:00Z', views: 267, negotiable: false, exchange: false },
  { id: 'l21', title: 'Mace Persiane - 6 muajshe', description: 'Mace persiane e bardhë, 6 muajshe, shumë e butë. Me vaksinime.', price: 25000, currency: 'ALL', city: 'Shkodër', images: [img('cat1')], category: CATEGORIES[7], user: MOCK_USERS[1], createdAt: '2026-02-23T15:00:00Z', views: 143, negotiable: true, exchange: false },

  // Sports
  { id: 'l22', title: 'Biçikletë malore Trek - 29"', description: 'Trek Marlin 7, rrota 29", 21 shpejtësi. Gjendje e mirë, përdorur 1 vit.', price: 55000, currency: 'ALL', city: 'Tiranë', images: [img('bike1'), img('bike2')], category: CATEGORIES[8], user: MOCK_USERS[3], createdAt: '2026-02-26T17:00:00Z', views: 98, negotiable: true, exchange: true },
  { id: 'l23', title: 'Set peshat (dumbell) 2x20kg', description: 'Set peshat të rregullueshme, 2x20kg. Në gjendje perfekte, pak të përdorura.', price: 8000, currency: 'ALL', city: 'Durrës', images: [img('gym1')], category: CATEGORIES[8], user: MOCK_USERS[0], createdAt: '2026-02-22T08:00:00Z', views: 56, negotiable: false, exchange: false },

  // Other
  { id: 'l24', title: 'Karrocë fëmije Chicco - si e re', description: 'Karrocë fëmije Chicco, model 3 në 1. Përdorur vetëm 4 muaj. Me çantë dhe aksesorë.', price: 28000, currency: 'ALL', city: 'Tiranë', images: [img('stroller1'), img('stroller2')], category: CATEGORIES[9], user: MOCK_USERS[1], createdAt: '2026-02-25T10:00:00Z', views: 73, negotiable: true, exchange: false },
  { id: 'l25', title: 'Piano elektrike Yamaha P-125', description: 'Yamaha P-125, 88 çelësa me peshë. Me stendë dhe pedal. Perfekte për fillestarë dhe mesatarë.', price: 65000, currency: 'ALL', city: 'Tiranë', images: [img('piano1')], category: CATEGORIES[9], user: MOCK_USERS[0], createdAt: '2026-02-21T14:00:00Z', views: 112, negotiable: true, exchange: false },

  // More vehicles
  { id: 'l26', title: 'Audi A4 2.0 TDI S-Line', description: 'Audi A4 S-Line, viti 2017, 140,000 km. Full LED, parking sensors, navigacion.', price: 1650000, currency: 'ALL', city: 'Shkodër', images: [img('audi1'), img('audi2')], category: CATEGORIES[0], subcategory: 'cars', user: MOCK_USERS[3], createdAt: '2026-02-28T12:00:00Z', views: 198, negotiable: true, exchange: false },
  { id: 'l27', title: 'Fiat 500 1.2 Lounge', description: 'Fiat 500, viti 2019, automatike, vetëm 35,000 km. Panoramik, klimë, sensora parkimi.', price: 950000, currency: 'ALL', city: 'Tiranë', images: [img('fiat1'), img('fiat2')], category: CATEGORIES[0], subcategory: 'cars', user: MOCK_USERS[1], createdAt: '2026-02-27T11:00:00Z', views: 145, negotiable: false, exchange: false },

  // More electronics
  { id: 'l28', title: 'Samsung Galaxy S24 Ultra', description: 'Galaxy S24 Ultra 512GB, ngjyrë Titanium Gray. Garanci Samsung deri Korrik 2026.', price: 110000, currency: 'ALL', city: 'Tiranë', images: [img('samsung1'), img('samsung2')], category: CATEGORIES[2], subcategory: 'phones', user: MOCK_USERS[3], createdAt: '2026-02-28T15:00:00Z', views: 178, negotiable: true, exchange: true },
  { id: 'l29', title: 'iPad Air M2 11" WiFi 256GB', description: 'iPad Air M2, ngjyrë Space Gray. Me Apple Pencil Pro dhe Smart Keyboard Folio.', price: 82000, currency: 'ALL', city: 'Vlorë', images: [img('ipad1')], category: CATEGORIES[2], subcategory: 'computers', user: MOCK_USERS[0], createdAt: '2026-02-26T09:00:00Z', views: 102, negotiable: true, exchange: false },

  // More properties
  { id: 'l30', title: 'Apartament 1+1 me qira në Qendër', description: 'Apartament 1+1 me qira, 55 m², kati 3. I mobiluar, me klimë dhe ngrohje. Pranë Pazarit të Ri.', price: 35000, currency: 'ALL', city: 'Tiranë', images: [img('rent1'), img('rent2')], category: CATEGORIES[1], subcategory: 'apartments', user: MOCK_USERS[3], createdAt: '2026-02-28T11:00:00Z', views: 367, negotiable: false, exchange: false },
];

export const MOCK_MESSAGES = [
  { id: 'm1', from: MOCK_USERS[1], listing: MOCK_LISTINGS[0], lastMessage: 'A është akoma në shitje makina?', time: '2026-02-28T14:00:00Z', unread: 2 },
  { id: 'm2', from: MOCK_USERS[3], listing: MOCK_LISTINGS[4], lastMessage: 'Dua ta vizitoj apartamentin nesër', time: '2026-02-28T10:00:00Z', unread: 0 },
  { id: 'm3', from: MOCK_USERS[0], listing: MOCK_LISTINGS[7], lastMessage: 'A bëni shkëmbim me Samsung?', time: '2026-02-27T18:00:00Z', unread: 1 },
];
