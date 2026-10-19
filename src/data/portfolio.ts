import { imageById, type ImageCrop, type ImageId } from "./image-manifest";

export type PortfolioCategory = "residential" | "commercial" | "exterior" | "lobby";

export type PortfolioItem = {
  id: string;
  imageId: ImageId;
  title: string;
  category: PortfolioCategory;
  image: string;
  alt: string;
  descriptor: string;
  width: number;
  height: number;
  crop: { desktop: ImageCrop; mobile: ImageCrop };
  relatedGroup?: string;
  groupingConfidence?: "high" | "uncertain";
  uncertainty?: string;
};

export const portfolioCategories: ReadonlyArray<{ id: PortfolioCategory; label: string }> = [
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial / Hospitality" },
  { id: "exterior", label: "Exteriors" },
  { id: "lobby", label: "Lobbies" },
];

function portfolioItem(
  imageId: ImageId,
  fields: Pick<PortfolioItem, "id" | "title" | "category" | "descriptor">,
): PortfolioItem {
  const asset = imageById(imageId);
  return {
    ...fields,
    imageId,
    image: asset.src,
    alt: asset.alt,
    width: asset.width,
    height: asset.height,
    crop: asset.crop,
    relatedGroup: asset.group?.id,
    groupingConfidence: asset.group?.confidence,
    uncertainty: asset.uncertainty,
  };
}

// The first five entries establish a balanced featured sequence. They deliberately
// move between hospitality, exterior, residential and lobby work instead of letting
// the larger residential folder dictate the homepage hierarchy.
export const portfolioItems: ReadonlyArray<PortfolioItem> = [
  portfolioItem("hospitalityBarWide", {
    id: "hospitality-bar", title: "Hospitality Bar", category: "commercial",
    descriptor: "Warm illumination · Dark finishes · Layered display",
  }),
  portfolioItem("towerDaySquare", {
    id: "high-rise-exterior-day", title: "High-Rise Exterior — Day", category: "exterior",
    descriptor: "Glazed facade · Urban context · Daylight",
  }),
  portfolioItem("warmLivingRoom", {
    id: "warm-living-room", title: "Warm Living Room", category: "residential",
    descriptor: "Warm timber · Soft lighting · Layered depth",
  }),
  portfolioItem("liftLobby", {
    id: "lift-lobby", title: "Lift Lobby", category: "lobby",
    descriptor: "Bronze tones · Patterned screens · Concealed light",
  }),
  portfolioItem("entertainmentFeature", {
    id: "entertainment-interior", title: "Entertainment Interior", category: "commercial",
    descriptor: "Feature lighting · Reflective surfaces · Dramatic contrast",
  }),
  portfolioItem("residentialMediaLounge", {
    id: "contemporary-media-lounge", title: "Contemporary Media Lounge", category: "residential",
    descriptor: "Layered lighting · Textured surfaces · Cool accents",
  }),
  portfolioItem("childrensBedroom", {
    id: "childrens-bedroom", title: "Children's Bedroom", category: "residential",
    descriptor: "Timber details · Soft colour · Functional planning",
  }),
  portfolioItem("tailoredBedroom", {
    id: "tailored-bedroom", title: "Tailored Bedroom", category: "residential",
    descriptor: "Integrated storage · Warm timber · Quiet contrast",
  }),
  portfolioItem("openPlanDining", {
    id: "open-plan-dining", title: "Open-Plan Dining", category: "residential",
    descriptor: "Marble surfaces · Timber joinery · Linear lighting",
  }),
  portfolioItem("integratedLivingSuite", {
    id: "integrated-living-suite", title: "Integrated Living Suite", category: "residential",
    descriptor: "Custom joinery · Reflective surfaces · Clean geometry",
  }),
  portfolioItem("windowSideLounge", {
    id: "window-side-lounge", title: "Window-Side Lounge", category: "residential",
    descriptor: "Daylight · Dark upholstery · Warm panelling",
  }),
  portfolioItem("modernBedroom", {
    id: "modern-bedroom", title: "Modern Bedroom", category: "residential",
    descriptor: "Upholstered details · Patterned panels · Soft daylight",
  }),
  portfolioItem("hospitalityTerrace", {
    id: "indoor-outdoor-lounge", title: "Indoor–Outdoor Lounge", category: "commercial",
    descriptor: "Curved seating · Filtered daylight · Perforated screens",
  }),
  portfolioItem("towerNightSquare", {
    id: "high-rise-exterior-night", title: "High-Rise Exterior — Night", category: "exterior",
    descriptor: "Facade lighting · City context · Evening atmosphere",
  }),
  portfolioItem("residentialCorridor", {
    id: "residential-corridor", title: "Residential Corridor", category: "lobby",
    descriptor: "Polished stone · Warm timber · Rhythmic lighting",
  }),
  portfolioItem("kidsBunkRoom", { id: "kids-bunk-room", title: "Kids' Bunk Room", category: "residential", descriptor: "" }),
  portfolioItem("brightLivingRoom", { id: "bright-living-room", title: "Bright Living Room", category: "residential", descriptor: "" }),
  portfolioItem("compactLivingRoom", { id: "compact-living-room", title: "Compact Living Room", category: "residential", descriptor: "" }),
  portfolioItem("livingPassage", { id: "living-passage", title: "Living Room Passage", category: "residential", descriptor: "" }),
  portfolioItem("blueKitchen", { id: "blue-kitchen", title: "Blue Kitchen", category: "residential", descriptor: "" }),
  portfolioItem("kitchenAppliances", { id: "kitchen-appliances", title: "Kitchen Appliance Wall", category: "residential", descriptor: "" }),
  portfolioItem("musicLounge", { id: "music-lounge", title: "Music Lounge", category: "commercial", descriptor: "" }),
  portfolioItem("restaurantSeating", { id: "restaurant-seating", title: "Restaurant Seating", category: "commercial", descriptor: "" }),
  portfolioItem("loungeReception", { id: "lounge-reception", title: "Lounge Reception", category: "commercial", descriptor: "" }),
  portfolioItem("hospitalityBarHero", { id: "illuminated-bar", title: "Illuminated Bar", category: "commercial", descriptor: "" }),
  portfolioItem("hospitalityScreen", { id: "screened-lounge", title: "Screened Lounge", category: "commercial", descriptor: "" }),
  portfolioItem("arrivalLobby", { id: "arrival-lobby", title: "Arrival Lobby", category: "lobby", descriptor: "" }),
  portfolioItem("towerNightPortrait", { id: "high-rise-night-angle", title: "High-Rise — Night Angle", category: "exterior", descriptor: "" }),
  portfolioItem("towerDayContext", { id: "high-rise-day-context", title: "High-Rise — Day Context", category: "exterior", descriptor: "" }),
  portfolioItem("livingFeatureWall", { id: "living-feature-wall", title: "Living Feature Wall", category: "residential", descriptor: "" }),
  portfolioItem("paletteBedroom", { id: "palette-bedroom", title: "Bedroom Palette", category: "residential", descriptor: "" }),
  portfolioItem("residentialPresentation", { id: "residential-presentation", title: "Residential Presentation", category: "residential", descriptor: "" }),
  portfolioItem("marbleSuiteBedroom", { id: "marble-suite-bedroom", title: "Marble Suite Bedroom", category: "residential", descriptor: "" }),
  portfolioItem("marbleTvBedroom", { id: "marble-tv-bedroom", title: "Marble Wall Bedroom", category: "residential", descriptor: "" }),
  portfolioItem("vanityBedroom", { id: "vanity-bedroom", title: "Vanity Bedroom", category: "residential", descriptor: "" }),
  portfolioItem("navyLivingRoom", { id: "navy-living-room", title: "Navy Living Room", category: "residential", descriptor: "" }),
  portfolioItem("walnutTvLounge", { id: "walnut-tv-lounge", title: "Walnut TV Lounge", category: "residential", descriptor: "" }),
  portfolioItem("treeMotifBedroom", { id: "tree-motif-bedroom", title: "Tree Motif Bedroom", category: "residential", descriptor: "" }),
  portfolioItem("warmStudyBedroom", { id: "warm-study-bedroom", title: "Bedroom with Study", category: "residential", descriptor: "" }),
  portfolioItem("mediaWallBedroom", { id: "media-wall-bedroom", title: "Media Wall Bedroom", category: "residential", descriptor: "" }),
  portfolioItem("archedLounge", { id: "arched-lounge", title: "Arched Lounge", category: "residential", descriptor: "" }),
  portfolioItem("greyPanelBedroom", { id: "grey-panel-bedroom", title: "Grey Panel Bedroom", category: "residential", descriptor: "" }),
  portfolioItem("vanityNook", { id: "vanity-nook", title: "Bedroom Vanity Nook", category: "residential", descriptor: "" }),
  portfolioItem("tealBedroom", { id: "teal-bedroom", title: "Teal Accent Bedroom", category: "residential", descriptor: "" }),
  portfolioItem("footballBedroom", { id: "football-bedroom", title: "Football Theme Bedroom", category: "residential", descriptor: "" }),
  portfolioItem("pinkKidsRoom", { id: "pink-kids-room", title: "Pink Kids' Room", category: "residential", descriptor: "" }),
  portfolioItem("timberFloorBedroom", { id: "timber-floor-bedroom", title: "Timber Floor Bedroom", category: "residential", descriptor: "" }),
  portfolioItem("upholsteredBedroom", { id: "upholstered-bedroom", title: "Upholstered Wall Bedroom", category: "residential", descriptor: "" }),
  portfolioItem("openLivingKitchen", { id: "open-living-kitchen", title: "Open Living and Kitchen", category: "residential", descriptor: "" }),
  portfolioItem("goldTrimLiving", { id: "gold-trim-living", title: "Gold Trim Living Room", category: "residential", descriptor: "" }),
  portfolioItem("marbleDining", { id: "marble-dining", title: "Marble Dining", category: "residential", descriptor: "" }),
  portfolioItem("burgundyDining", { id: "burgundy-dining", title: "Burgundy Dining", category: "residential", descriptor: "" }),
  portfolioItem("parallelKitchen", { id: "parallel-kitchen", title: "Kitchen with a View", category: "residential", descriptor: "" }),
  portfolioItem("blackMarbleKitchen", { id: "black-marble-kitchen", title: "Black Marble Kitchen", category: "residential", descriptor: "" }),
  portfolioItem("walnutBedroom", { id: "walnut-bedroom", title: "Walnut Feature Bedroom", category: "residential", descriptor: "" }),
  portfolioItem("greyKitchen", { id: "grey-kitchen", title: "Grey Gloss Kitchen", category: "residential", descriptor: "" }),
  portfolioItem("blackMarbleBath", { id: "black-marble-bath", title: "Black Marble Bathroom", category: "residential", descriptor: "" }),
  portfolioItem("directorCabin", { id: "director-cabin", title: "Director's Cabin", category: "commercial", descriptor: "" }),
  portfolioItem("conferenceRoom", { id: "conference-room", title: "Conference Room", category: "commercial", descriptor: "" }),
  portfolioItem("executiveOffice", { id: "executive-office", title: "Executive Office", category: "commercial", descriptor: "" }),
  portfolioItem("officeReception", { id: "office-reception", title: "Office Reception", category: "commercial", descriptor: "" }),
  portfolioItem("sageCabin", { id: "sage-cabin", title: "Sage Green Cabin", category: "commercial", descriptor: "" }),
  portfolioItem("barLounge", { id: "bar-lounge", title: "Bar Lounge", category: "commercial", descriptor: "" }),
  portfolioItem("archedBooths", { id: "arched-booths", title: "Arched Booths", category: "commercial", descriptor: "" }),
  portfolioItem("screenedLounge", { id: "screened-lounge", title: "Arched Screen Lounge", category: "commercial", descriptor: "" }),
  portfolioItem("airLoungeDesk", { id: "air-lounge-desk", title: "Lounge Reception Desk", category: "commercial", descriptor: "" }),
  portfolioItem("heritageLounge", { id: "heritage-lounge", title: "Heritage Lounge", category: "commercial", descriptor: "" }),
  portfolioItem("heritageSitting", { id: "heritage-sitting", title: "Heritage Sitting Room", category: "commercial", descriptor: "" }),
  portfolioItem("modernVilla", { id: "modern-villa", title: "Modern Villa", category: "exterior", descriptor: "" }),
  portfolioItem("townhouseFacade", { id: "townhouse-facade", title: "Townhouse Facade", category: "exterior", descriptor: "" }),
];
