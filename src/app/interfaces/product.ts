export interface Product {
  id: number;
  title: string;
  description: string;
  handle: string;
  sku: string;
  grams: number;
  stock: number;
  price: number;
  comparePrice: number;
  barcode: string;
}

export interface ProductUpdate {
  title?: string;
  description?: string;
  handle?: string;
  sku?: string;
  grams?: number;
  stock?: number;
  price?: number;
  comparePrice?: number;
  barcode?: string;
}
