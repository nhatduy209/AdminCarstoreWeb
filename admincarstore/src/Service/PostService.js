import axios from 'axios';
import {token_authen} from '../Config/Status/Key';

export default class PostService {
  async PostAPI(url, params) {
    const authen_token = localStorage.getItem(token_authen);
    const response = await axios.post(
      url,
      {params},
      {
        headers: {
          token: authen_token ?? 'undefined', //the token is a variable which holds the token
        },
      },
    );
    return {
      data: response.data,
      status: response.data.result,
    };
  }
}
