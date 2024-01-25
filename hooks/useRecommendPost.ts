import {postAPI} from '@/modules';
import {
  useQueryClient,
  useQuery,
  useMutation,
  keepPreviousData,
} from '@tanstack/react-query';

export const useRecommendPost = () => {
  const queryClient = useQueryClient();

  const {data, isLoading, error} = useQuery({
    queryKey: ['recommendPosts'],
    queryFn: () => postAPI.getNearDeadlinePostList(),
    placeholderData: keepPreviousData,
  });

  const mutation = useMutation({
    mutationFn: () => postAPI.getNearDeadlinePostList(),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['recommendPosts']});
    },
  });

  return {
    data: data || [],
    isLoading,
    error,
    mutation,
  };
};
