export type Expert = {
  id: string;
  name: string;
  role: string;
  department: string;
  position: string;
  experience: string;
  email: string;
  phone: string;
  officeHours: string;
  officeAddress: string;
  mlsNumber: string;
  languages: string;
  bio: string;
  image: string;
  expertiseTitle: string;
  expertiseSummary: string;
};

export const experts: Expert[] = [
  {
    id: "philippe-starck",
    name: "Philippe Starck",
    role: "Property Specialist",
    department: "Electricity",
    position: "IT Team",
    experience: "7+ years",
    email: "contact@yourproject.com",
    phone: "+1 (555) 341-9782",
    officeHours: "Mon to Friday",
    officeAddress: "Suite 5A Trade, 2500 Main St, Texas",
    mlsNumber: "US-MN-374228",
    languages: "Arabic, Spanish, English",
    bio: "As a listing and sales specialist, I am dedicated to real estate and have a deep passion for the work I have done. I thrive in helping clients buy, sell, and invest with confidence and clarity.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    expertiseTitle: "Luxury Portfolio Management",
    expertiseSummary: "Premium villa and high-value property negotiation.",
  },
  {
    id: "marcus-renovo",
    name: "Marcus Renovo",
    role: "Property Specialist",
    department: "Investment",
    position: "Senior Advisor",
    experience: "9+ years",
    email: "marcus@yourproject.com",
    phone: "+1 (555) 198-7734",
    officeHours: "Mon to Saturday",
    officeAddress: "24 Palm Avenue, Downtown, California",
    mlsNumber: "US-CA-118490",
    languages: "English, French",
    bio: "Marcus focuses on real-estate investment opportunities and helps buyers build profitable property portfolios with low-risk strategies.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    expertiseTitle: "Investment Advisory",
    expertiseSummary: "ROI-focused property analysis for long-term wealth.",
  },
  {
    id: "lehnid-vor",
    name: "Lehnid Vor",
    role: "Property Specialist",
    department: "Relocation",
    position: "Client Lead",
    experience: "6+ years",
    email: "lehnid@yourproject.com",
    phone: "+1 (555) 882-1199",
    officeHours: "Mon to Friday",
    officeAddress: "85 Midtown Plaza, New York",
    mlsNumber: "US-NY-635007",
    languages: "English, German",
    bio: "Lehnid helps families relocating to new cities find the right community and property with minimal stress and fast closing timelines.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
    expertiseTitle: "Family Relocation",
    expertiseSummary: "Smooth city-to-city transition support and planning.",
  },
  {
    id: "alexandra-rossie",
    name: "Alexandra Rossies",
    role: "Property Specialist",
    department: "Residential",
    position: "Sales Executive",
    experience: "5+ years",
    email: "alexandra@yourproject.com",
    phone: "+1 (555) 664-3340",
    officeHours: "Mon to Friday",
    officeAddress: "17 Harbor Lane, Miami",
    mlsNumber: "US-FL-244960",
    languages: "English, Spanish",
    bio: "Alexandra is known for strong communication and transparent deal handling. She supports clients from first consultation to final handover.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    expertiseTitle: "Residential Sales",
    expertiseSummary: "Client-first residential buying and selling services.",
  },
];

export function getExpertById(id: string) {
  return experts.find((expert) => expert.id === id);
}
