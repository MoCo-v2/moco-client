import axios from 'axios';
import createAxiosInstance from '@/utils/axiosInstance';
import {ResponseComment} from '@/modules';

const apiUrl = process.env.NEXT_PUBLIC_MOCO_API_URL + '/api/v1';

const axiosInstance = createAxiosInstance(
  `${process.env.NEXT_PUBLIC_MOCO_API_URL}/api/v1`,
);

export const commentAPI = {
  createComment: ({postId, content}: {postId: number; content: string}) =>
    axiosInstance
      .post<ResponseComment>(`/private/comments/${postId}`, {content})
      .then(res => res.data),
  modifiedComment: ({
    commentId,
    content,
  }: {
    commentId: number;
    content: string;
  }) =>
    axiosInstance
      .put<ResponseComment>(`/private/comments/${commentId}`, {content})
      .then(res => res.data),
  deleteComment: (commentId: number) =>
    axiosInstance
      .delete(`/private/comments/${commentId}`)
      .then(res => res.data),
  getCommentsByPostId: (id: number) =>
    axios
      .get<ResponseComment[]>(`${apiUrl}/public/comments/${id}`)
      .then(res => res.data),
};
