import {bannerkAPI} from '@/modules';
import {useQueryClient, useQuery, useMutation} from '@tanstack/react-query';

export const useBannerList = () => {
  const queryClient = useQueryClient();

  const {data, isLoading, error} = useQuery({
    queryKey: ['bannerList'],
    queryFn: bannerkAPI.getBannerList,
  });

  const mutation = useMutation({
    mutationFn: bannerkAPI.getBannerList,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['bannerList']});
    },
  });

  return {data, isLoading, error, mutation};
};
