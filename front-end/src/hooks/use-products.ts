'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface ProductsQueryFilter {
  type?: string;
  specification?: string;
}

export function useProductsQuery(filter: ProductsQueryFilter = {}) {
  const normalizedFilter = {
    ...(filter.type ? { type: filter.type } : {}),
    ...(filter.specification ? { specification: filter.specification } : {}),
  };

  return useQuery({
    queryKey: ['products', normalizedFilter],
    queryFn: () => api.products.getAll(normalizedFilter),
  });
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.products.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
