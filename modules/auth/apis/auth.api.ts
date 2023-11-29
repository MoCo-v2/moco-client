import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_MOCO_API_URL + '/api/v1';

export const authAPI = {
  userLogin: (data: {provider: string; accessToken: string}) => {
    axios.post(`${apiUrl}/login`, data).then(res => res.data);
  },
};
