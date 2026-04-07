export type PropertyFaq = {
  question: string;
  answer: string;
};

export type PropertyDetail = {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  price: string;
  heroImage: string;
  gallery: string[];
  description: string;
  youtubeEmbedUrl: string;
  address: {
    area: string;
    city: string;
    country: string;
    zipCode: string;
  };
  details: Array<{ label: string; value: string }>;
  features: string[];
  faqs: PropertyFaq[];
};
