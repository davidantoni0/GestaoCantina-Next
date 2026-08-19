export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export type CartItem = {
  productId: number;
  quantity: number;
};
