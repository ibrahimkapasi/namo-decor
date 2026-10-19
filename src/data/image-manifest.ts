export type ImageCategory =
  | "residential-interior"
  | "hospitality-interior"
  | "exterior"
  | "lobby"
  | "portrait";

export type ImagePlacement =
  | "hero-primary"
  | "hero-detail"
  | "studio"
  | "portfolio-feature"
  | "portfolio-archive"
  | "service-support"
  | "founder"
  | "contact-background";

export type ImageCrop = {
  aspectRatio: `${number} / ${number}`;
  objectPosition: string;
};

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  category: ImageCategory;
  label: string;
  placements: readonly ImagePlacement[];
  crop: { desktop: ImageCrop; mobile: ImageCrop };
  focalPoint: string;
  textSafeArea: "left" | "right" | "top" | "bottom" | "none";
  apparentQuality: "hero-ready" | "large" | "supporting";
  group?: { id: string; confidence: "high" | "uncertain" };
  uncertainty?: string;
  developerNote?: string;
};

export const imageManifest = {
  hospitalityBarHero: {
    src: "/images/Neha-maam-bar-webp/1 .jpg.webp", width: 3492, height: 1970,
    alt: "3D visualization of a hospitality bar with illuminated circular bottle displays, globe lights and stone counters",
    category: "hospitality-interior", label: "Illuminated hospitality bar", placements: ["hero-primary", "portfolio-feature"],
    crop: { desktop: { aspectRatio: "16 / 9", objectPosition: "54% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "61% 50%" } },
    focalPoint: "The illuminated bar wall and long counter", textSafeArea: "left", apparentQuality: "hero-ready",
    group: { id: "hospitality-bar-series", confidence: "high" },
    developerNote: "Primary hero candidate: the strongest wide, high-resolution image with a clear architectural rhythm and a dark left edge that can support concise copy. Keep the mobile crop centred on the illuminated bar rather than the lounge furniture.",
  },
  hospitalityBarWide: {
    src: "/images/Neha-maam-bar-webp/2 .jpg.webp", width: 3492, height: 1970,
    alt: "3D visualization of a hospitality bar with an illuminated bottle wall, stone counter and lounge seating",
    category: "hospitality-interior", label: "Hospitality bar and lounge", placements: ["portfolio-feature"],
    crop: { desktop: { aspectRatio: "16 / 9", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "68% 50%" } },
    focalPoint: "Bar counter with lounge seating in the foreground", textSafeArea: "none", apparentQuality: "hero-ready",
    group: { id: "hospitality-bar-series", confidence: "high" },
  },
  hospitalityLounge: {
    src: "/images/Neha-maam-bar-webp/5.webp", width: 2361, height: 1801,
    alt: "3D visualization of a hospitality lounge with curved seating, warm upholstery and a screened terrace edge",
    category: "hospitality-interior", label: "Screened hospitality lounge", placements: ["service-support"],
    crop: { desktop: { aspectRatio: "4 / 3", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "54% 50%" } },
    focalPoint: "Curved seating group and perforated screen", textSafeArea: "none", apparentQuality: "large",
    group: { id: "hospitality-bar-series", confidence: "high" },
  },
  hospitalityTerrace: {
    src: "/images/Neha-maam-bar-webp/6.webp", width: 2155, height: 1801,
    alt: "3D visualization of a hospitality lounge with curved seating, perforated screens and a glazed terrace edge",
    category: "hospitality-interior", label: "Indoor-outdoor hospitality lounge", placements: ["portfolio-feature"],
    crop: { desktop: { aspectRatio: "4 / 3", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "55% 50%" } },
    focalPoint: "Curved seating framed by the glazed exterior edge", textSafeArea: "none", apparentQuality: "large",
    group: { id: "hospitality-bar-series", confidence: "high" },
  },
  hospitalityScreen: {
    src: "/images/Neha-maam-bar-webp/8.webp", width: 3500, height: 1970,
    alt: "3D visualization of a hospitality lounge with curved seating and perforated metal screens",
    category: "hospitality-interior", label: "Hospitality screen study", placements: ["studio"],
    crop: { desktop: { aspectRatio: "16 / 9", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "45% 50%" } },
    focalPoint: "Layered perforated screens and curved seating", textSafeArea: "none", apparentQuality: "large",
    group: { id: "hospitality-bar-series", confidence: "high" },
  },
  entertainmentFeature: {
    src: "/images/Neha-maam-bar-webp/9.webp", width: 3500, height: 1910,
    alt: "3D visualization of an entertainment interior with a sculptural purple illuminated wall and dark finishes",
    category: "hospitality-interior", label: "Illuminated entertainment feature", placements: ["portfolio-feature"],
    crop: { desktop: { aspectRatio: "16 / 9", objectPosition: "54% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "64% 50%" } },
    focalPoint: "Purple illuminated wall and raised platform", textSafeArea: "left", apparentQuality: "hero-ready",
    group: { id: "hospitality-bar-series", confidence: "high" },
  },
  residentialMediaLounge: {
    src: "/images/namo-webp/2.webp", width: 1355, height: 762,
    alt: "3D visualization of a residential media lounge with blue seating, a television wall and globe pendant lights",
    category: "residential-interior", label: "Residential media lounge", placements: ["portfolio-feature"],
    crop: { desktop: { aspectRatio: "16 / 9", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "68% 50%" } },
    focalPoint: "Television wall, dining zone and blue seating", textSafeArea: "none", apparentQuality: "supporting",
    group: { id: "residential-set-a", confidence: "uncertain" }, uncertainty: "Several residential frames share finishes, but the available files do not establish a project relationship.",
  },
  childrensBedroom: {
    src: "/images/namo-webp/4.webp", width: 1355, height: 762,
    alt: "3D visualization of a children's bedroom with a bunk bed, study desk and soft green storage",
    category: "residential-interior", label: "Children's bedroom", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "16 / 9", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "40% 50%" } },
    focalPoint: "Bunk bed and green storage", textSafeArea: "none", apparentQuality: "supporting",
  },
  tailoredBedroom: {
    src: "/images/namo-webp/5.webp", width: 1355, height: 762,
    alt: "3D visualization of a bedroom with integrated timber storage, neutral upholstery and framed artwork",
    category: "residential-interior", label: "Tailored bedroom", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "16 / 9", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Bed framed by full-width storage", textSafeArea: "none", apparentQuality: "supporting",
  },
  openPlanDining: {
    src: "/images/namo-webp/DINING.webp", width: 1355, height: 762,
    alt: "3D visualization of an open-plan dining area with timber joinery, marble flooring and recessed lighting",
    category: "residential-interior", label: "Open-plan dining", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "16 / 9", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "57% 50%" } },
    focalPoint: "Dining table and adjoining living space", textSafeArea: "none", apparentQuality: "supporting",
  },
  warmLivingRoom: {
    src: "/images/namo-webp/living 2.webp", width: 1920, height: 1080,
    alt: "3D visualization of a warm living room with timber panelling, neutral seating and layered ceiling lighting",
    category: "residential-interior", label: "Warm living room", placements: ["studio", "portfolio-feature"],
    crop: { desktop: { aspectRatio: "16 / 9", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "62% 50%" } },
    focalPoint: "Sofa, timber wall and corner glazing", textSafeArea: "left", apparentQuality: "large",
    group: { id: "residential-living-series", confidence: "uncertain" }, uncertainty: "The repeated room geometry suggests a related series, but no project metadata is available.",
  },
  integratedLivingSuite: {
    src: "/images/namo-webp/living 3.webp", width: 1920, height: 1080,
    alt: "3D visualization of a residential living suite with a television wall, wardrobe storage and polished flooring",
    category: "residential-interior", label: "Integrated living suite", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "16 / 9", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "54% 50%" } },
    focalPoint: "Television wall and integrated joinery", textSafeArea: "none", apparentQuality: "large",
    group: { id: "residential-living-series", confidence: "uncertain" }, uncertainty: "Visually related to other living-room frames; exact project grouping is unverified.",
  },
  livingFeatureWall: {
    src: "/images/namo-webp/living 4.webp", width: 1920, height: 1080,
    alt: "3D visualization of a living room with a geometric feature wall, neutral seating and soft daylight",
    category: "residential-interior", label: "Living-room feature wall", placements: ["studio"],
    crop: { desktop: { aspectRatio: "16 / 9", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "58% 50%" } },
    focalPoint: "Sofa and geometric feature wall", textSafeArea: "left", apparentQuality: "large",
    group: { id: "residential-living-series", confidence: "uncertain" }, uncertainty: "Visually related to other living-room frames; exact project grouping is unverified.",
  },
  windowSideLounge: {
    src: "/images/namo-webp/LIVING.webp", width: 1355, height: 762,
    alt: "3D visualization of a window-side lounge with dark seating, timber panels and a sculptural pendant",
    category: "residential-interior", label: "Window-side lounge", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "16 / 9", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "63% 50%" } },
    focalPoint: "Seating group beside the bright window", textSafeArea: "left", apparentQuality: "supporting",
  },
  modernBedroom: {
    src: "/images/namo-webp/mbed.webp", width: 1355, height: 762,
    alt: "3D visualization of a bedroom with a blue upholstered bed, patterned wall panels and full-height curtains",
    category: "residential-interior", label: "Modern bedroom", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "16 / 9", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "49% 50%" } },
    focalPoint: "Blue bed and patterned wall panels", textSafeArea: "none", apparentQuality: "supporting",
  },
  paletteBedroom: {
    src: "/images/namo-webp/mbed1.webp", width: 1355, height: 762,
    alt: "3D visualization of a bedroom with blue textiles, pink accents and a coordinated material palette",
    category: "residential-interior", label: "Bedroom palette study", placements: ["service-support"],
    crop: { desktop: { aspectRatio: "16 / 9", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "52% 50%" } },
    focalPoint: "Bed textiles and wall artwork", textSafeArea: "none", apparentQuality: "supporting",
  },
  residentialPresentation: {
    src: "/images/namo-webp/6.webp", width: 4000, height: 2250,
    alt: "3D visualization of a residential interior with a television wall, desk and full-height glazing",
    category: "residential-interior", label: "Residential presentation view", placements: ["service-support"],
    crop: { desktop: { aspectRatio: "16 / 9", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "58% 50%" } },
    focalPoint: "Television wall and study area", textSafeArea: "none", apparentQuality: "hero-ready",
  },
  towerDayPortrait: {
    src: "/images/exterior-webp/Day View_01.webp", width: 2500, height: 4000,
    alt: "Daytime architectural visualization of a high-rise tower in a landscaped urban setting",
    category: "exterior", label: "High-rise exterior, day angle", placements: ["service-support"],
    crop: { desktop: { aspectRatio: "3 / 4", objectPosition: "50% 52%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Full tower silhouette", textSafeArea: "top", apparentQuality: "hero-ready",
    group: { id: "high-rise-day-night-series", confidence: "high" },
  },
  towerDayContext: {
    src: "/images/exterior-webp/Day View_02.webp", width: 3713, height: 4000,
    alt: "Daytime architectural visualization of a high-rise tower with surrounding city context",
    category: "exterior", label: "High-rise exterior, contextual day view", placements: ["studio"],
    crop: { desktop: { aspectRatio: "4 / 5", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Tower and landscaped base", textSafeArea: "top", apparentQuality: "hero-ready",
    group: { id: "high-rise-day-night-series", confidence: "high" },
  },
  towerDaySquare: {
    src: "/images/exterior-webp/Day View_03.webp", width: 4000, height: 4000,
    alt: "Daytime architectural visualization of a high-rise tower with a glazed facade and landscaped base",
    category: "exterior", label: "High-rise exterior, frontal day view", placements: ["portfolio-feature", "hero-detail"],
    crop: { desktop: { aspectRatio: "1 / 1", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Full tower and symmetrical landscaped base", textSafeArea: "top", apparentQuality: "hero-ready",
    group: { id: "high-rise-day-night-series", confidence: "high" }, developerNote: "Use as the hero's secondary render window: its near-square source and centred tower survive both desktop and mobile crops without sacrificing the facade.",
  },
  towerNightPortrait: {
    src: "/images/exterior-webp/Night View_01.webp", width: 2500, height: 4000,
    alt: "Night architectural visualization of an illuminated high-rise tower viewed from below",
    category: "exterior", label: "High-rise exterior, night angle", placements: ["hero-detail", "portfolio-archive"],
    crop: { desktop: { aspectRatio: "3 / 4", objectPosition: "50% 48%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Illuminated tower against the blue sky", textSafeArea: "top", apparentQuality: "hero-ready",
    group: { id: "high-rise-day-night-series", confidence: "high" },
  },
  towerNightSquare: {
    src: "/images/exterior-webp/Night View_02.webp", width: 4000, height: 4000,
    alt: "Night architectural visualization of an illuminated high-rise tower within a city setting",
    category: "exterior", label: "High-rise exterior, frontal night view", placements: ["portfolio-feature", "contact-background"],
    crop: { desktop: { aspectRatio: "1 / 1", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Full illuminated tower and landscaped base", textSafeArea: "top", apparentQuality: "hero-ready",
    group: { id: "high-rise-day-night-series", confidence: "high" },
  },
  arrivalLobby: {
    src: "/images/lobby-webp/1.0.webp", width: 2000, height: 1667,
    alt: "3D visualization of an arrival lobby with a reception desk, warm wall lighting and pale stone flooring",
    category: "lobby", label: "Arrival lobby", placements: ["service-support"],
    crop: { desktop: { aspectRatio: "4 / 3", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Reception desk and illuminated wall", textSafeArea: "none", apparentQuality: "large",
    group: { id: "lobby-series", confidence: "high" },
  },
  liftLobby: {
    src: "/images/lobby-webp/2.0.webp", width: 2000, height: 1667,
    alt: "3D visualization of a lift lobby with bronze-toned panels, patterned screens and concealed lighting",
    category: "lobby", label: "Lift lobby", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "4 / 3", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Lift doors and patterned wall screens", textSafeArea: "none", apparentQuality: "large",
    group: { id: "lobby-series", confidence: "high" },
  },
  residentialCorridor: {
    src: "/images/lobby-webp/3.0.webp", width: 2000, height: 1667,
    alt: "3D visualization of a residential corridor with polished stone walls, timber doors and recessed lighting",
    category: "lobby", label: "Residential corridor", placements: ["portfolio-archive", "service-support"],
    crop: { desktop: { aspectRatio: "4 / 3", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Long corridor axis and repeated door rhythm", textSafeArea: "none", apparentQuality: "large",
    group: { id: "lobby-series", confidence: "high" },
  },
  compactLivingRoom: {
    src: "/images/namo-webp/1.webp", width: 1355, height: 762,
    alt: "3D visualization of a compact living room with a timber-framed television unit, grey sofa and teal cushions",
    category: "residential-interior", label: "Compact living room", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "1355 / 762", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Compact living room", textSafeArea: "none", apparentQuality: "supporting",
  },
  kidsBunkRoom: {
    src: "/images/namo-webp/3.webp", width: 895, height: 762,
    alt: "3D visualization of a children's room with a timber bunk bed, teal feature wall and moon night light",
    category: "residential-interior", label: "Kids' bunk room", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "895 / 762", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Kids' bunk room", textSafeArea: "none", apparentQuality: "supporting",
  },
  blueKitchen: {
    src: "/images/namo-webp/kitchen 1.webp", width: 732, height: 762,
    alt: "3D visualization of a kitchen with blue cabinetry, fluted glass shutters and a marble backsplash",
    category: "residential-interior", label: "Blue kitchen", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "732 / 762", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Blue kitchen", textSafeArea: "none", apparentQuality: "supporting",
  },
  kitchenAppliances: {
    src: "/images/namo-webp/kitchen 2.webp", width: 713, height: 760,
    alt: "3D visualization of a kitchen with blue cabinets, built-in oven and full-height refrigerator",
    category: "residential-interior", label: "Kitchen appliance wall", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "713 / 760", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Kitchen appliance wall", textSafeArea: "none", apparentQuality: "supporting",
  },
  brightLivingRoom: {
    src: "/images/namo-webp/living 1.webp", width: 1355, height: 762,
    alt: "3D visualization of a bright living room with a textured feature wall, L-shaped sofa and timber ceiling details",
    category: "residential-interior", label: "Bright living room", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "1355 / 762", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Bright living room", textSafeArea: "none", apparentQuality: "supporting",
  },
  livingPassage: {
    src: "/images/namo-webp/living 5.webp", width: 1355, height: 762,
    alt: "3D visualization of a living area with a marble television wall, timber panelling and a view down the passage",
    category: "residential-interior", label: "Living room passage", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "1355 / 762", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Living room passage", textSafeArea: "none", apparentQuality: "supporting",
  },
  musicLounge: {
    src: "/images/Neha-maam-bar-webp/11.webp", width: 3308, height: 1954,
    alt: "3D visualization of a lounge with a purple illuminated wave wall, neon signage and patterned flooring",
    category: "hospitality-interior", label: "Music lounge", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "3308 / 1954", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Music lounge", textSafeArea: "none", apparentQuality: "supporting",
  },
  restaurantSeating: {
    src: "/images/Neha-maam-bar-webp/4.webp", width: 3500, height: 1970,
    alt: "3D visualization of a restaurant with tan lounge chairs, stone walls and an illuminated signage wall",
    category: "hospitality-interior", label: "Restaurant seating", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "3500 / 1970", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Restaurant seating", textSafeArea: "none", apparentQuality: "supporting",
  },
  loungeReception: {
    src: "/images/Neha-maam-bar-webp/Reception (2).webp", width: 3500, height: 3500,
    alt: "3D visualization of a lounge reception with a sculpted 3D wall, dark counter and arched metal screens",
    category: "hospitality-interior", label: "Lounge reception", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "3500 / 3500", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Lounge reception", textSafeArea: "none", apparentQuality: "supporting",
  },
  marbleSuiteBedroom: {
    src: "/images/portfolio/marble-suite-bedroom.webp", width: 2400, height: 1350,
    alt: "3D visualization of a bedroom with a marble feature wall, gold-inlaid wardrobes and navy bedding",
    category: "residential-interior", label: "Marble Suite Bedroom", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2400 / 1350", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Marble Suite Bedroom", textSafeArea: "none", apparentQuality: "large",
  },
  marbleTvBedroom: {
    src: "/images/portfolio/marble-tv-bedroom.webp", width: 2400, height: 1350,
    alt: "3D visualization of a bedroom facing a marble television wall framed by gold-trimmed panels",
    category: "residential-interior", label: "Marble Wall Bedroom", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2400 / 1350", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Marble Wall Bedroom", textSafeArea: "none", apparentQuality: "large",
  },
  vanityBedroom: {
    src: "/images/portfolio/vanity-bedroom.webp", width: 1920, height: 1080,
    alt: "3D visualization of a bedroom with a backlit vanity arch, fluted headboard wall and taupe wardrobes",
    category: "residential-interior", label: "Vanity Bedroom", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "1920 / 1080", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Vanity Bedroom", textSafeArea: "none", apparentQuality: "large",
  },
  navyLivingRoom: {
    src: "/images/portfolio/navy-living-room.webp", width: 2400, height: 1350,
    alt: "3D visualization of a living room with navy sofas, arched wall panels and white round tables",
    category: "residential-interior", label: "Navy Living Room", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2400 / 1350", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Navy Living Room", textSafeArea: "none", apparentQuality: "large",
  },
  walnutTvLounge: {
    src: "/images/portfolio/walnut-tv-lounge.webp", width: 2400, height: 1350,
    alt: "3D visualization of a living room with a walnut-slatted television wall and crystal wall sconces",
    category: "residential-interior", label: "Walnut TV Lounge", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2400 / 1350", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Walnut TV Lounge", textSafeArea: "none", apparentQuality: "large",
  },
  treeMotifBedroom: {
    src: "/images/portfolio/tree-motif-bedroom.webp", width: 1353, height: 761,
    alt: "3D visualization of a bedroom with a circular tree-motif headboard wall and green drapes",
    category: "residential-interior", label: "Tree Motif Bedroom", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "1353 / 761", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Tree Motif Bedroom", textSafeArea: "none", apparentQuality: "large",
  },
  warmStudyBedroom: {
    src: "/images/portfolio/warm-study-bedroom.webp", width: 1353, height: 761,
    alt: "3D visualization of a bedroom with a pendant-lit headboard, tall wardrobes and an orange throw",
    category: "residential-interior", label: "Bedroom with Study", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "1353 / 761", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Bedroom with Study", textSafeArea: "none", apparentQuality: "large",
  },
  mediaWallBedroom: {
    src: "/images/portfolio/media-wall-bedroom.webp", width: 1353, height: 761,
    alt: "3D visualization of a bedroom with a floating desk, open shelving and a wall-mounted television",
    category: "residential-interior", label: "Media Wall Bedroom", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "1353 / 761", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Media Wall Bedroom", textSafeArea: "none", apparentQuality: "large",
  },
  archedLounge: {
    src: "/images/portfolio/arched-lounge.webp", width: 1353, height: 761,
    alt: "3D visualization of a lounge with navy armchairs, arched panelling and a timber screen",
    category: "residential-interior", label: "Arched Lounge", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "1353 / 761", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Arched Lounge", textSafeArea: "none", apparentQuality: "large",
  },
  greyPanelBedroom: {
    src: "/images/portfolio/grey-panel-bedroom.webp", width: 1179, height: 758,
    alt: "3D visualization of a bedroom with grey wall panels, a sculptural wall light and full-height wardrobes",
    category: "residential-interior", label: "Grey Panel Bedroom", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "1179 / 758", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Grey Panel Bedroom", textSafeArea: "none", apparentQuality: "large",
  },
  vanityNook: {
    src: "/images/portfolio/vanity-nook.webp", width: 1353, height: 761,
    alt: "3D visualization of a bedroom with a round mirror vanity beneath a wall-mounted television",
    category: "residential-interior", label: "Bedroom Vanity Nook", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "1353 / 761", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Bedroom Vanity Nook", textSafeArea: "none", apparentQuality: "large",
  },
  tealBedroom: {
    src: "/images/portfolio/teal-bedroom.webp", width: 2400, height: 1350,
    alt: "3D visualization of a bedroom with timber storage, a corner study and teal and pink bedding",
    category: "residential-interior", label: "Teal Accent Bedroom", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2400 / 1350", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Teal Accent Bedroom", textSafeArea: "none", apparentQuality: "large",
  },
  footballBedroom: {
    src: "/images/portfolio/football-bedroom.webp", width: 1800, height: 1540,
    alt: "3D visualization of a teenager's bedroom with a football mural, chevron wardrobes and display shelves",
    category: "residential-interior", label: "Football Theme Bedroom", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "1800 / 1540", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Football Theme Bedroom", textSafeArea: "none", apparentQuality: "large",
  },
  pinkKidsRoom: {
    src: "/images/portfolio/pink-kids-room.webp", width: 2394, height: 1684,
    alt: "3D visualization of a girl's bedroom with mountain wall art, a study desk and timber storage",
    category: "residential-interior", label: "Pink Kids' Room", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2394 / 1684", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Pink Kids' Room", textSafeArea: "none", apparentQuality: "large",
  },
  timberFloorBedroom: {
    src: "/images/portfolio/timber-floor-bedroom.webp", width: 2400, height: 1350,
    alt: "3D visualization of a bedroom with timber flooring, white gloss wardrobes and soft daylight",
    category: "residential-interior", label: "Timber Floor Bedroom", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2400 / 1350", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Timber Floor Bedroom", textSafeArea: "none", apparentQuality: "large",
  },
  upholsteredBedroom: {
    src: "/images/portfolio/upholstered-bedroom.webp", width: 2400, height: 1350,
    alt: "3D visualization of a bedroom with an upholstered headboard wall, lit bed base and arched niches",
    category: "residential-interior", label: "Upholstered Wall Bedroom", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2400 / 1350", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Upholstered Wall Bedroom", textSafeArea: "none", apparentQuality: "large",
  },
  openLivingKitchen: {
    src: "/images/portfolio/open-living-kitchen.webp", width: 2400, height: 1350,
    alt: "3D visualization of an open-plan living room flowing into a kitchen with a marble television wall",
    category: "residential-interior", label: "Open Living and Kitchen", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2400 / 1350", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Open Living and Kitchen", textSafeArea: "none", apparentQuality: "large",
  },
  goldTrimLiving: {
    src: "/images/portfolio/gold-trim-living.webp", width: 2400, height: 1350,
    alt: "3D visualization of a living room with grey sofas, a framed art wall and gold-trimmed stone panels",
    category: "residential-interior", label: "Gold Trim Living Room", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2400 / 1350", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Gold Trim Living Room", textSafeArea: "none", apparentQuality: "large",
  },
  marbleDining: {
    src: "/images/portfolio/marble-dining.webp", width: 1355, height: 762,
    alt: "3D visualization of a dining area with a marble table, patterned chairs and gold edging",
    category: "residential-interior", label: "Marble Dining", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "1355 / 762", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Marble Dining", textSafeArea: "none", apparentQuality: "large",
  },
  burgundyDining: {
    src: "/images/portfolio/burgundy-dining.webp", width: 1355, height: 762,
    alt: "3D visualization of a dining and living space with burgundy chairs and a floral artwork wall",
    category: "residential-interior", label: "Burgundy Dining", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "1355 / 762", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Burgundy Dining", textSafeArea: "none", apparentQuality: "large",
  },
  parallelKitchen: {
    src: "/images/portfolio/parallel-kitchen.webp", width: 1355, height: 762,
    alt: "3D visualization of a white kitchen opening onto a balcony with a green outlook",
    category: "residential-interior", label: "Kitchen with a View", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "1355 / 762", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Kitchen with a View", textSafeArea: "none", apparentQuality: "large",
  },
  blackMarbleKitchen: {
    src: "/images/portfolio/black-marble-kitchen.webp", width: 1353, height: 761,
    alt: "3D visualization of a kitchen with a black marble backsplash, built-in ovens and a washing machine bay",
    category: "residential-interior", label: "Black Marble Kitchen", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "1353 / 761", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Black Marble Kitchen", textSafeArea: "none", apparentQuality: "large",
  },
  walnutBedroom: {
    src: "/images/portfolio/walnut-bedroom.webp", width: 2400, height: 1350,
    alt: "3D visualization of a bedroom with a lit walnut headboard niche, step shelves and a linear-light ceiling",
    category: "residential-interior", label: "Walnut Feature Bedroom", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2400 / 1350", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Walnut Feature Bedroom", textSafeArea: "none", apparentQuality: "large",
  },
  greyKitchen: {
    src: "/images/portfolio/grey-kitchen.webp", width: 968, height: 1055,
    alt: "3D visualization of a grey gloss kitchen with a built-in microwave and tall refrigerator",
    category: "residential-interior", label: "Grey Gloss Kitchen", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "968 / 1055", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Grey Gloss Kitchen", textSafeArea: "none", apparentQuality: "large",
  },
  blackMarbleBath: {
    src: "/images/portfolio/black-marble-bath.webp", width: 901, height: 945,
    alt: "3D visualization of a bathroom with black marble walls, fluted panels and brass fittings",
    category: "residential-interior", label: "Black Marble Bathroom", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "901 / 945", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Black Marble Bathroom", textSafeArea: "none", apparentQuality: "large",
  },
  directorCabin: {
    src: "/images/portfolio/director-cabin.webp", width: 2400, height: 1350,
    alt: "3D visualization of an office cabin with an orange sofa, framed art and a stone feature wall",
    category: "hospitality-interior", label: "Director's Cabin", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2400 / 1350", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Director's Cabin", textSafeArea: "none", apparentQuality: "large",
  },
  conferenceRoom: {
    src: "/images/portfolio/conference-room.webp", width: 2400, height: 1350,
    alt: "3D visualization of a conference room with green chairs, timber walls and a linear pendant",
    category: "hospitality-interior", label: "Conference Room", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2400 / 1350", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Conference Room", textSafeArea: "none", apparentQuality: "large",
  },
  executiveOffice: {
    src: "/images/portfolio/executive-office.webp", width: 2400, height: 1350,
    alt: "3D visualization of an executive office with timber panelling, framed prints and a marble wall",
    category: "hospitality-interior", label: "Executive Office", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2400 / 1350", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Executive Office", textSafeArea: "none", apparentQuality: "large",
  },
  officeReception: {
    src: "/images/portfolio/office-reception.webp", width: 1920, height: 1080,
    alt: "3D visualization of an office reception with a blush counter, botanical wallpaper and an arched niche",
    category: "hospitality-interior", label: "Office Reception", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "1920 / 1080", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Office Reception", textSafeArea: "none", apparentQuality: "large",
  },
  sageCabin: {
    src: "/images/portfolio/sage-cabin.webp", width: 2400, height: 1350,
    alt: "3D visualization of a glass-walled office cabin with sage panelling and botanical artwork",
    category: "hospitality-interior", label: "Sage Green Cabin", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2400 / 1350", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Sage Green Cabin", textSafeArea: "none", apparentQuality: "large",
  },
  barLounge: {
    src: "/images/portfolio/bar-lounge.webp", width: 2400, height: 1351,
    alt: "3D visualization of a bar lounge with tan seating, a stone signage wall and globe lights",
    category: "hospitality-interior", label: "Bar Lounge", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2400 / 1351", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Bar Lounge", textSafeArea: "none", apparentQuality: "large",
  },
  archedBooths: {
    src: "/images/portfolio/arched-booths.webp", width: 2400, height: 946,
    alt: "3D visualization of restaurant booths set within brick-red arches with tan upholstery",
    category: "hospitality-interior", label: "Arched Booths", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2400 / 946", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Arched Booths", textSafeArea: "none", apparentQuality: "large",
  },
  screenedLounge: {
    src: "/images/portfolio/screened-lounge.webp", width: 2400, height: 1153,
    alt: "3D visualization of a lounge with lit wall arches, a beaded screen and tan sofas",
    category: "hospitality-interior", label: "Arched Screen Lounge", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2400 / 1153", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Arched Screen Lounge", textSafeArea: "none", apparentQuality: "large",
  },
  airLoungeDesk: {
    src: "/images/portfolio/air-lounge-desk.webp", width: 2400, height: 2400,
    alt: "3D visualization of a lounge reception with a sculpted wall, signage and a dark desk",
    category: "hospitality-interior", label: "Lounge Reception Desk", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2400 / 2400", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Lounge Reception Desk", textSafeArea: "none", apparentQuality: "large",
  },
  heritageLounge: {
    src: "/images/portfolio/heritage-lounge.webp", width: 2400, height: 1350,
    alt: "3D visualization of a heritage-style lounge with cane chairs, patterned tiles and teal walls",
    category: "hospitality-interior", label: "Heritage Lounge", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2400 / 1350", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Heritage Lounge", textSafeArea: "none", apparentQuality: "large",
  },
  heritageSitting: {
    src: "/images/portfolio/heritage-sitting.webp", width: 2400, height: 1350,
    alt: "3D visualization of a sitting room with teal walls, framed lotus art and a patterned rug",
    category: "hospitality-interior", label: "Heritage Sitting Room", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "2400 / 1350", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Heritage Sitting Room", textSafeArea: "none", apparentQuality: "large",
  },
  modernVilla: {
    src: "/images/portfolio/modern-villa.webp", width: 1875, height: 2233,
    alt: "Architectural visualization of a two-storey house with timber fins, planters and a stone facade",
    category: "exterior", label: "Modern Villa", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "1875 / 2233", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Modern Villa", textSafeArea: "none", apparentQuality: "large",
  },
  townhouseFacade: {
    src: "/images/portfolio/townhouse-facade.webp", width: 1175, height: 1969,
    alt: "Architectural visualization of a narrow townhouse with timber louvres, balconies and greenery",
    category: "exterior", label: "Townhouse Facade", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "1175 / 1969", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Townhouse Facade", textSafeArea: "none", apparentQuality: "large",
  },
  planSample: {
    src: "/images/portfolio/plan-sample.webp", width: 734, height: 768,
    alt: "Rendered 2D floor plan of an apartment showing furnished bedrooms, living, dining and kitchen",
    category: "residential-interior", label: "Rendered 2D floor plan", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "734 / 768", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Rendered 2D floor plan", textSafeArea: "none", apparentQuality: "large",
  },
  moodBoard: {
    src: "/images/portfolio/mood-board.webp", width: 736, height: 1308,
    alt: "Interior mood board with timber, stone and fabric swatches, furniture and a neutral colour palette",
    category: "residential-interior", label: "Interior mood board", placements: ["portfolio-archive"],
    crop: { desktop: { aspectRatio: "736 / 1308", objectPosition: "50% 50%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 50%" } },
    focalPoint: "Interior mood board", textSafeArea: "none", apparentQuality: "large",
  },
  kitchenBefore: {
    src: "/images/portfolio/kitchen-before-aligned.webp", width: 2400, height: 1350,
    alt: "2D elevation drawing of a kitchen showing refrigerator, oven, OTG, shutters, loft, dado and drawer dimensions",
    category: "residential-interior", label: "Kitchen elevation drawing", placements: ["portfolio-feature"],
    crop: { desktop: { aspectRatio: "16 / 9", objectPosition: "50% 50%" }, mobile: { aspectRatio: "16 / 9", objectPosition: "50% 50%" } },
    focalPoint: "Full kitchen elevation", textSafeArea: "none", apparentQuality: "large",
  },
  kitchenAfter: {
    src: "/images/portfolio/kitchen-after.webp", width: 2400, height: 1350,
    alt: "3D visualization of the same kitchen with taupe gloss cabinets, fluted glass shutters, teal tile dado and built-in ovens",
    category: "residential-interior", label: "Kitchen 3D render", placements: ["portfolio-feature"],
    crop: { desktop: { aspectRatio: "16 / 9", objectPosition: "50% 50%" }, mobile: { aspectRatio: "16 / 9", objectPosition: "50% 50%" } },
    focalPoint: "Full kitchen run", textSafeArea: "none", apparentQuality: "hero-ready",
  },
  founderPortrait: {
    src: "/images/1D5A2423.JPG.jpeg", width: 1500, height: 2250,
    alt: "Naitri Mehta, founder of Namo Decor",
    category: "portrait", label: "Founder portrait", placements: ["founder"],
    crop: { desktop: { aspectRatio: "2 / 3", objectPosition: "50% 38%" }, mobile: { aspectRatio: "4 / 5", objectPosition: "50% 28%" } },
    focalPoint: "Head-and-shoulders portrait", textSafeArea: "right", apparentQuality: "large",
  },
} as const satisfies Record<string, SiteImage>;

export type ImageId = keyof typeof imageManifest;

export const imageById = (id: ImageId): SiteImage => imageManifest[id];

export const assetLimitations = [
  "The exterior library contains one tower across five viewpoints, not five separate projects.",
  "The lobby library contains three views and should be used sparingly to avoid implying a broader archive.",
] as const;
