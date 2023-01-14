import { ICountry } from "./country";

export interface ICartAddressData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  country: ICountry;
  email: string;
}

export interface ISelectedCard {
  id: string;
  price: string;
  description: string;
  iconName: string;
}
