export type Product = {
  _id?: string;
  id?: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  reviews: any[];
  createdAt?: string;
  updatedAt?: string;
  slug: string;
}
