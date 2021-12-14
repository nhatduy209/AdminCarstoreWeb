import axios from 'axios';

export default class PostService {
  async PostAPI(url, params) {
    const response = await axios.post(url, {params});
    return {
      data: response.data,
      status: response.data.result,
    };
  }
}
