export const contact = {
  phone: "",
  whatsapp: "",
  email: "",
  socials: {
    instagram: "",
    linkedin: "",
    facebook: "",
    behance: "",
    pinterest: "",
  },
  address: [
    "Shop No. 16, Gokul Horizon - B",
    "Opposite Gundecha Trillium",
    "Dattani Park, Thakur Village",
    "Kandivali East, Mumbai, Maharashtra 400101",
  ],
  addressConfirmed: false,
  businessHours: [
    { days: "Monday–Saturday", hours: "9:00 AM–8:00 PM" },
    { days: "Sunday", hours: "9:00 AM–1:00 PM" },
  ],
  businessHoursConfirmed: false,
} as const;

const digitsOnly = (value: string) => value.replace(/\D/g, "");

export const contactLinks = {
  whatsapp: contact.whatsapp
    ? `https://wa.me/${digitsOnly(contact.whatsapp)}?text=${encodeURIComponent("Hi Namo Decor, I’d like to discuss a visualization project.")}`
    : "",
  phone: contact.phone ? `tel:${contact.phone}` : "",
  email: contact.email
    ? `mailto:${contact.email}?subject=${encodeURIComponent("Visualization Project Inquiry")}`
    : "",
  maps: contact.addressConfirmed && contact.address.length
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address.join(", "))}`
    : "",
};

export const configuredSocials = (Object.entries(contact.socials) as [keyof typeof contact.socials, string][])
  .filter(([, href]) => Boolean(href))
  .map(([network, href]) => ({
    label: network.charAt(0).toUpperCase() + network.slice(1),
    href,
  }));
