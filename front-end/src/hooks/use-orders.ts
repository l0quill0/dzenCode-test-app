'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useOrdersQuery() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => api.orders.getAll(),
  });
}

export function useOrderQuery(id: number | null) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => (id ? api.orders.getOne(id) : null),
    enabled: typeof id === 'number' && id > 0,
  });
}

export function useDeleteOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.orders.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      await queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
