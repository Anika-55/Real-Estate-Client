import {
  Building2,
  Dumbbell,
  Landmark,
  ParkingSquare,
  PawPrint,
  ShieldCheck,
  Trees,
  Waves,
} from "lucide-react";
import type {
  Agent,
  Amenity,
  Property,
  SocialLogo,
  Testimonial,
} from "@/features/landing/types";

export const heroVideoSources = ["/videos/hero.mp4"];

export const metrics = [
  { label: "Properties Sold", value: "4.8K+" },
  { label: "Happy Families", value: "12K+" },
  { label: "Trusted Agents", value: "240+" },
  { label: "Cities Covered", value: "32+" },
];

export const featuredProperties: Property[] = [
  {
    id: 1,
    title: "Palm Harbor Heights",
    location: "California, USA",
    price: "$845,000",
    beds: 4,
    baths: 3,
    area: "3,100 Sq Ft",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Skyline Urban Loft",
    location: "New York, USA",
    price: "$690,000",
    beds: 3,
    baths: 2,
    area: "2,200 Sq Ft",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Golden Beach Villa",
    location: "Florida, USA",
    price: "$1,120,000",
    beds: 5,
    baths: 4,
    area: "4,100 Sq Ft",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
  },
];

export const amenities: Amenity[] = [
  { id: 1, title: "Smart Home", icon: Building2 },
  { id: 2, title: "Swimming Pool", icon: Waves },
  { id: 3, title: "Private Parking", icon: ParkingSquare },
  { id: 4, title: "Fitness Center", icon: Dumbbell },
  { id: 5, title: "24/7 Security", icon: ShieldCheck },
  { id: 6, title: "Playground", icon: Trees },
  { id: 7, title: "Co-working Space", icon: Landmark },
  { id: 8, title: "Pet Friendly", icon: PawPrint },
];

export const agents: Agent[] = [
  {
    id: 1,
    name: "Samantha Lee",
    role: "Senior Property Advisor",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "David Walker",
    role: "Luxury Home Specialist",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Nora Ahmed",
    role: "Investment Consultant",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Liam Brooks",
    role: "Relocation Expert",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
];

export const trustedByLogos: SocialLogo[] = [
  { id: 1, name: "UrbanNest Capital" },
  { id: 2, name: "Prime Avenue Group" },
  { id: 3, name: "Northline Developers" },
  { id: 4, name: "BluePeak Holdings" },
  { id: 5, name: "MetroVista Realty" },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Their team closed our purchase in under two weeks with complete transparency and zero stress.",
    author: "Farhana Rahman",
    role: "Home Buyer",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Strong market knowledge and very honest guidance. We made a better investment than expected.",
    author: "Imran Chowdhury",
    role: "Property Investor",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "The virtual tour and shortlist process saved us so much time. Everything felt smooth and professional.",
    author: "Nabila Sultana",
    role: "Relocating Family",
    rating: 5,
  },
];
