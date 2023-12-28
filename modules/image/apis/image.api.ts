import createAxiosInstance from '@/utils/axiosInstance';

const axiosInstance = createAxiosInstance(
  `${process.env.NEXT_PUBLIC_MOCO_API_URL}/api/v1`,
);

export const imageAPI = {
  uploadImage: (data: FormData) =>
    axiosInstance.post('/private/images', data).then(res => res.data),
};
