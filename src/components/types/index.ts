export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category?: string;
    inventory: number;
  };
  
  export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
  
  export type User = {
    id: string;
    name: string;
    email: string;
    image?: string;
  };