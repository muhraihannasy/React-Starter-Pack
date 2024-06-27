import { Axios } from "../../service";

import Product from "./type";

export async function getProducts(): Promise<Product[]> {
  const { data } = await Axios.get('/items/products');  
  return data?.data;
}

export async function createProduct(product: Product): Promise<Product[]> {
    const { data } = await Axios.post('/items/products', product);  
    return data?.data;
  }