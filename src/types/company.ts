export interface CompanyContextState {
  cities: City[];
  admin: Admin;
  contacts: Contact[];
  faq: Faq[];
}

export interface City {
  description: string;
  guides: Guide[];
  id: number;
  imageUrl: string;
  route: string;
  title: string;
}

export interface Admin {
  email: string;
  name: string;
  uid: string;
}
export interface Contact {
  address: string;
  city: string;
  email: string;
  geolocation: {
    lat: number;
    lng: number;
  };
  name: string;
  tel: string;
  walk: string;
}

export interface Faq {
  answer: string;
  question: string;
}

export interface Guide {
  description: string;
  name: string;
  photoUrl: string;
  type: string;
}
