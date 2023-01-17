export interface ICartAddressData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
}

export interface ISelectedDeliveryMethod {
  id: string;
  price: string;
  description: string;
  iconName: string;
}
