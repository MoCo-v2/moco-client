import {authAPI} from '@/modules';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

export const useUserProfile = (id?: string) => {
  if (!id)
    return {
      user: undefined,
      mutation: undefined,
      isLoading: false,
      error: undefined,
    };

  const queryClient = useQueryClient();

  const {data, isLoading, error} = useQuery({
    queryKey: ['userProfile', id],
    queryFn: () => authAPI.getUserProfile(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: () => authAPI.getUserProfile(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['userProfile', id]});
    },
  });

  return {
    user: data,
    mutation,
    isLoading,
    error,
  };
};
