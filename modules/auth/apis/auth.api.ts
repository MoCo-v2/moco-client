import axios from 'axios';
import createAxiosInstance from '@/utils/axiosInstance';
import {ResponseUser, SignUpData} from '@/modules';

const apiUrl = process.env.NEXT_PUBLIC_MOCO_API_URL + '/api/v1';

const axiosInstance = createAxiosInstance(
  `${process.env.NEXT_PUBLIC_MOCO_API_URL}/api/v1`,
);

export const authAPI = {
  userLogin: (data: {provider: string; accessToken: string}) =>
    axios.post(`${apiUrl}/public/login`, data).then(res => res.data),
  userSignUp: (data: SignUpData) =>
    axios.post(`${apiUrl}/public/join`, data).then(res => res.data),
  getProfile: () =>
    axiosInstance.get<ResponseUser>('/private/users').then(res => res.data),
  getUserProfile: (id: string) =>
    axios
      .get<ResponseUser>(`${apiUrl}/public/users/${id}`)
      .then(res => res.data),
  checkNickName: (name: string) =>
    axios.get(`${apiUrl}/public/check-nickname/${name}`).then(res => res.data),
  updateUser: (data: SignUpData) =>
    axiosInstance.put(`${apiUrl}/private/users`, data).then(res => res.data),
  deleteUser: () =>
    axiosInstance.delete(`${apiUrl}/private/users`).then(res => res.data),
};
