export interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'buyer';
}

export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    lat: number;
    lng: number;
  };
  bedrooms: number;
  bathrooms: number;
  squarefeet: number;
  images: string[];
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  type: 'apartment' | 'house' | 'rental-house' | 'villa';
  status: 'available' | 'sold' | 'rented';
}

export interface Booking {
  _id: string;
  propertyId: string;
  userId: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Enquiry {
  _id: string;
  propertyId: string;
  propertyTitle: string;
  senderName: string;
  senderEmail: string;
  message: string;
  date: string;
  status: 'unread' | 'read';
}
