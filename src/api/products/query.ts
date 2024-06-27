import { useQuery } from "@tanstack/react-query";

import {  getProducts } from "./fetcher";


export function useGetProducts() {
    return useQuery({queryKey: ['products'], queryFn: getProducts, staleTime: 10000})
}
