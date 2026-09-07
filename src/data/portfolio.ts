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
];
