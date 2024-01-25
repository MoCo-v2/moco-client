import axios from 'axios';
import createAxiosInstance from '@/utils/axiosInstance';
import {ResponsePost, WritePostData} from '@/modules';

const apiUrl = process.env.NEXT_PUBLIC_MOCO_API_URL + '/api/v1';

const axiosInstance = createAxiosInstance(
  `${process.env.NEXT_PUBLIC_MOCO_API_URL}/api/v1`,
);

export const postAPI = {
  writePost: (data: WritePostData) =>
    axiosInstance.post<number>('/private/posts', data).then(res => res.data),
  deletePost: (id: number) =>
    axiosInstance.delete(`/private/posts/${id}`).then(res => res.data),
  modifyPost: (id: number, data: WritePostData) =>
    axiosInstance.put(`/private/posts/${id}`, data).then(res => res.data),
  endRecruitmentPost: (id: number) =>
    axiosInstance.patch(`/private/posts/${id}`).then(res => res.data),
  getPostById: (id: string) =>
    axios
      .get<ResponsePost>(`${apiUrl}/public/posts/${id}`)
      .then(res => res.data),
  getPostList: (filter: {offset: number; limit: number; recruit?: boolean}) =>
    axios
      .get<{posts: ResponsePost[]; totalElements: number; totalPages: number}>(
        `${apiUrl}/public/posts`,
        {params: filter},
      )
      .then(res => res.data),
  getBookmarkPostList: (filter: {
    offset: number;
    limit: number;
    recruit?: boolean;
  }) =>
    axiosInstance
      .get<{posts: ResponsePost[]; totalElements: number; totalPages: number}>(
        `${apiUrl}/private/posts`,
        {params: filter},
      )
      .then(res => res.data),
  getNearDeadlinePostList: () =>
    axios
      .get<ResponsePost[]>(`${apiUrl}/public/posts/near-deadline`)
      .then(res => res.data),
};
