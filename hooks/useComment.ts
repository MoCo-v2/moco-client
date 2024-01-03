import {commentAPI} from '@/modules';
import {useQueryClient, useQuery, useMutation} from '@tanstack/react-query';

export const useComments = (postId: number) => {
  const queryClient = useQueryClient();

  const {data, isLoading, error} = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => commentAPI.getCommentsByPostId(postId),
  });

  const mutation = useMutation({
    mutationFn: () => commentAPI.getCommentsByPostId(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['comments', postId]});
    },
  });

  return {data, isLoading, error, mutation};
};
