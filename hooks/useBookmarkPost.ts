import {postAPI} from '@/modules';
import {
  useQueryClient,
  useQuery,
  useMutation,
  keepPreviousData,
} from '@tanstack/react-query';

export const useBookmarkPost = (filter: {
  offset: number;
  limit: number;
  recruit?: boolean;
}) => {
  const queryClient = useQueryClient();

  const {data, isLoading, error} = useQuery({
    queryKey: ['bookmarkPosts', filter],
    queryFn: () => postAPI.getBookmarkPostList(filter),
    placeholderData: keepPreviousData,
  });

  const mutation = useMutation({
    mutationFn: () => postAPI.getBookmarkPostList(filter),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['bookmarkPosts', filter]});
    },
  });

  return {
    data: data?.posts,
    totalElements: data?.totalElements,
    totalPages: data?.totalPages,
    isLoading,
    error,
    mutation,
  };
};
