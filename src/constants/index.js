import { facebook, instagram,  twitter } from "../assets/icons";
export const footerLinks = [
  {
    title: "Services",
    links: [
      { name: "Chat-1", link: "/chat-1" },
      { name: "Chat-2", link: "/chat-2" },
      { name: "Chat-3", link: "/chat-3" },
      { name: "Chat-4", link: "/chat-4" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "About Us", link: "/about" }
    ],
  },
  {
    title: "Get in Touch",
    links: [
      {
        name: "support@yourwebsite.com",
        link: "mailto:support@yourwebsite.com",
      },
      { name: "+1 (123) 456-7890", link: "tel:+11234567890" },
      { name: "Visit Us", link: "/contact-us" },
    ],
  },
];

export const socialMedia = [
  { src: facebook, alt: "Facebook logo", link: "https://facebook.com/yourwebsite" },
  { src: twitter, alt: "Twitter logo", link: "https://twitter.com/yourwebsite" },
  { src: instagram, alt: "Instagram logo", link: "https://instagram.com/yourwebsite" },
];