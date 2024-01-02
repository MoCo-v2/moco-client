import {authAPI} from '@/modules';
import {useQuery} from '@tanstack/react-query';

export const useUser = () => {
  const {data, isLoading, error} = useQuery({
    queryKey: ['user'],
    queryFn: authAPI.getProfile,
  });

  return {
    user: data,
    isLoading,
    error,
  };
};
