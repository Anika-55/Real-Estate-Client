import type { LucideIcon } from "lucide-react";

export type Property = {
  id: number;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  image: string;
};

export type Amenity = {
  id: number;
  title: string;
  icon: LucideIcon;
};

export type Agent = {
  id: number;
  name: string;
  role: string;
  image: string;
};

export type SocialLogo = {
  id: number;
  name: string;
};

export type Testimonial = {
  id: number;
  quote: string;
  author: string;
  role: string;
  rating: number;
};
