import { imageById } from "./image-manifest";

export const navigation = [
  { label: "Work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const company = {
  name: "Namo Decor",
  location: "Mumbai · India",
  positioning: "3D visualization agency with end-to-end design support",
  audience: "Architects · Interior designers · Builders · Design studios · Developers",
};

export const founder = {
  name: "Naitri Mehta",
  foundedAtAge: 20,
  industryExperienceYears: 7,
  focus: "Design, visual storytelling and high-impact architectural visuals",
  purpose: "Supporting architects and interior designers as a project partner across India",
};

export const heroImages = {
  primary: imageById("hospitalityBarHero"),
};
