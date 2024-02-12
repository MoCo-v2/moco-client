import createAxiosInstance from '@/utils/axiosInstance';

const axiosInstance = createAxiosInstance(
  `${process.env.NEXT_PUBLIC_MOCO_API_URL}/api/v1`,
);

export const bookmarkAPI = {
  createBookmark: (postId: number) =>
    axiosInstance.post(`/private/bookmark/${postId}`).then(res => res.data),
  deleteBookmark: (postId: number) =>
    axiosInstance.delete(`/private/bookmark/${postId}`).then(res => res.data),
  getBookmarkIds: () =>
    axiosInstance
      .get<{idList: number[]}>(`/private/bookmark`)
      .then(res => res.data),
};
