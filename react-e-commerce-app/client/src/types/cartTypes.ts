import { ICountry } from "./country";

export interface ICartAddressData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  email: string;
}

export interface ISelectedDeliveryMethod {
  id: string;
  price: string;
  description: string;
  iconName: string;
}

export interface IPhone {
  value: string;
  error: string;
}

export interface ISelectedCountry {
  value: ICountry | null;
  error: string;
}
