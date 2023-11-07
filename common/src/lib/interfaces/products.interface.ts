export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  holdAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}
