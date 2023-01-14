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

export interface ISelectedDeliveryMethod {
  id: string;
  price: string;
  description: string;
  iconName: string;
}
