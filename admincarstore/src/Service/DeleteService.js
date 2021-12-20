import axios from 'axios';
import {token_authen} from '../Config/Status/Key';

export default class DeleteService {
  async DeleteAPI(url, params) {
    const authen_token = localStorage.getItem(token_authen);
    const response = await axios.delete(url, {
      params,
      headers: {
        token: authen_token ?? 'undefine',
      },
    });

    console.log('DATA ----', response);
    return {
      data: response.data,
      status: response.data.result,
    };
  }
}
