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
  icon: string;
};

export type Agent = {
  id: number;
  name: string;
  role: string;
  image: string;
};
