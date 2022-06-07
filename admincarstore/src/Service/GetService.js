import axios from 'axios';
import {STATUS} from '../Config/Status/Index';
import {token_authen} from '../Config/Status/Key';
export default class GetService {
  async getAPI(url) {
    const authen_token = localStorage.getItem(token_authen);
    try {
      const response = await axios.get(url, {
        headers: {
          token: authen_token ?? 'undefined', //the token is a variable which holds the token
        },
      });
      return {
        data: response.data,
        status: STATUS.SUCCESS,
      };
    } catch (err) {
      return {
        data: {},
        status: STATUS.FAIL,
      };
    }
  }

  async getApiWithParam(url, params) {
    const authen_token = localStorage.getItem(token_authen);
    try {
      const response = await axios.get(url,  {
        params,
        headers: {
          token: authen_token ?? 'undefined', //the token is a variable which holds the token
        },
      });
      return {
        data: response.data,
        status: STATUS.SUCCESS,
      };
    } catch (err) {
      return {
        data: {},
        status: STATUS.FAIL,
      };
    }
  }
}
