export type Service = {
  number: string;
  title: string;
  shortLabel: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    number: "01",
    title: "3D Interior Visualization",
    shortLabel: "Interior",
    description: "Photoreal interior renders that communicate spatial intent, materials, lighting and atmosphere before execution begins.",
    image: "/images/Neha-maam-bar-webp/5.webp",
    imageAlt: "Hospitality interior visualization with layered lighting, furniture and material detail",
  },
  {
    number: "02",
    title: "Exterior Visualization",
    shortLabel: "Exterior",
    description: "Architectural exterior renders that present form, facade, context and light with clarity for review and presentation.",
    image: "/images/exterior-webp/Day View_01.webp",
    imageAlt: "Day-time architectural visualization of a high-rise exterior",
  },
  {
    number: "03",
    title: "Walkthroughs",
    shortLabel: "Motion",
    description: "Architectural walkthroughs that turn a sequence of designed spaces into an immersive, presentation-ready visual journey.",
    image: "/images/lobby-webp/3.0.webp",
    imageAlt: "Long rendered lobby corridor suggesting a spatial walkthrough sequence",
  },
  {
    number: "04",
    title: "2D Drawings",
    shortLabel: "Drawings",
    description: "Clear 2D drawing support that helps develop, coordinate and communicate design intent across project teams.",
    image: "/images/namo-webp/6.webp",
    imageAlt: "Resolved residential interior visualization used to communicate design intent",
  },
  {
    number: "05",
    title: "Mood Boards",
    shortLabel: "Direction",
    description: "Curated mood boards that align colour, material, lighting and visual direction before detailed development.",
    image: "/images/namo-webp/mbed1.webp",
    imageAlt: "Bedroom visualization showing a coordinated palette of colour, texture and materials",
  },
  {
    number: "06",
    title: "Visualization Support",
    shortLabel: "Partner",
    description: "Flexible visualization and design-presentation support for architects, interior designers, builders and studios across project stages.",
    image: "/images/lobby-webp/1.0.webp",
    imageAlt: "Detailed lobby visualization prepared for architectural design presentation",
  },
];
