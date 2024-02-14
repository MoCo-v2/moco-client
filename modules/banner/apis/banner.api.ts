import axios from 'axios';
import {ResponseBanner} from '../models/banner.model';

const apiUrl = process.env.NEXT_PUBLIC_MOCO_API_URL + '/api/v1';

export const bannerkAPI = {
  getBannerList: () =>
    axios
      .get<ResponseBanner[]>(`${apiUrl}/public/banners`)
      .then(res => res.data),
};
