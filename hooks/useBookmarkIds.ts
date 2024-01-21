import {bookmarkAPI} from '@/modules';
import {useQueryClient, useQuery, useMutation} from '@tanstack/react-query';

export const useBookmarkIds = () => {
  const queryClient = useQueryClient();

  const {data, isLoading, error} = useQuery({
    queryKey: ['bookmarkIds'],
    queryFn: bookmarkAPI.getBookmarkIds,
  });

  const mutation = useMutation({
    mutationFn: bookmarkAPI.getBookmarkIds,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['bookmarkIds']});
    },
  });

  return {data: data?.idList || [], isLoading, error, mutation};
};
