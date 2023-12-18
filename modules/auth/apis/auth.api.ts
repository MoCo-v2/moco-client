import axios from 'axios';

import {SignUpData} from '..';

const apiUrl = process.env.NEXT_PUBLIC_MOCO_API_URL + '/api/v1';

export const authAPI = {
  userLogin: (data: {provider: string; accessToken: string}) =>
    axios.post(`${apiUrl}/public/login`, data).then(res => res.data),
  userSignUp: (data: SignUpData) =>
    axios.post(`${apiUrl}/public/join`, data).then(res => res.data),
};
