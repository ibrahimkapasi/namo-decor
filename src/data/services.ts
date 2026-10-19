import { imageById, type ImageId } from "./image-manifest";

export type Service = {
  number: string;
  title: string;
  shortLabel: string;
  description: string;
  image: string;
  imageAlt: string;
  imageId: ImageId;
  imageRole: "direct-example" | "spatial-reference" | "representative-outcome";
};

const service = (
  imageId: ImageId,
  fields: Omit<Service, "image" | "imageAlt" | "imageId">,
  imageAlt?: string,
): Service => {
  const image = imageById(imageId);
  return { ...fields, imageId, image: image.src, imageAlt: imageAlt ?? image.alt };
};

export const services: Service[] = [
  service("moodBoard", {
    number: "01",
    title: "Mood Boards",
    shortLabel: "Direction",
    description: "Curated mood boards that align colour, material, lighting and visual direction before detailed development.",
    imageRole: "direct-example",
  }),
  service("planSample", {
    number: "02",
    title: "2D Drawings",
    shortLabel: "Drawings",
    description: "Clear 2D drawing support that helps develop, coordinate and communicate design intent across project teams.",
    imageRole: "direct-example",
  }),
  service("hospitalityLounge", {
    number: "03",
    title: "3D Interior Visualization",
    shortLabel: "Interior",
    description: "Photoreal interior renders that communicate spatial intent, materials, lighting and atmosphere before execution begins.",
    imageRole: "direct-example",
  }),
  service("towerDayPortrait", {
    number: "04",
    title: "Exterior Visualization",
    shortLabel: "Exterior",
    description: "Architectural exterior renders that present form, facade, context and light with clarity for review and presentation.",
    imageRole: "direct-example",
  }),
  service("residentialCorridor", {
    number: "05",
    title: "Walkthroughs",
    shortLabel: "Motion",
    description: "Architectural walkthroughs that turn a sequence of designed spaces into an immersive, presentation-ready visual journey.",
    imageRole: "spatial-reference",
  }, "Still 3D visualization of a long residential corridor used as a spatial-sequence reference"),
  service("conferenceRoom", {
    number: "06",
    title: "Visualization Support",
    shortLabel: "Partner",
    description: "Flexible visualization and design-presentation support for architects, interior designers, builders and studios across project stages.",
    imageRole: "direct-example",
  }),
];
