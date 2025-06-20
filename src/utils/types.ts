export type TContact = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  tags?: string[];
  lastInteraction?: string;
  __v?: number;
};

export type TCreateContact = {
  name: string;
  phone: string;
  email: string;
  tags?: string[];
  lastInteraction: string;
};