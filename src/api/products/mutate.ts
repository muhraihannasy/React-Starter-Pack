import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createProduct } from './fetcher';

import Product from './type';

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Product) => createProduct(product),
    onSuccess: (data) => {
      queryClient.setQueryData(['products'], (oldData: Product[]) => {
        return oldData ? [...oldData, data] : oldData;
      });
    }
  });
}
