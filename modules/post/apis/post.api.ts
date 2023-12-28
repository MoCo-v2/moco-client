import createAxiosInstance from '@/utils/axiosInstance';

const axiosInstance = createAxiosInstance(
  `${process.env.NEXT_PUBLIC_MOCO_API_URL}/api/v1`,
);

export const postAPI = {};
