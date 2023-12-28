import createAxiosInstance from '@/utils/axiosInstance';
import {WritePostData} from '@/modules';

const axiosInstance = createAxiosInstance(
  `${process.env.NEXT_PUBLIC_MOCO_API_URL}/api/v1`,
);

export const postAPI = {
  writePost: (data: WritePostData) =>
    axiosInstance.post('/private/posts', data).then(res => res.data),
};
