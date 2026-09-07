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
  "No source assets depict 2D drawings or mood boards; finished renders must not be labelled as either.",
  "The exterior library contains one tower across five viewpoints, not five separate projects.",
  "The lobby library contains three views and should be used sparingly to avoid implying a broader archive.",
] as const;
