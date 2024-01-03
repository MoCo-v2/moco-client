import {authAPI} from '@/modules';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

export const useUser = () => {
  const queryClient = useQueryClient();

  const {data, isLoading, error} = useQuery({
    queryKey: ['user'],
    queryFn: authAPI.getProfile,
  });

  const mutation = useMutation({
    mutationFn: authAPI.getProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user']});
    },
  });

  return {
    user: data,
    mutation,
    isLoading,
    error,
  };
};
