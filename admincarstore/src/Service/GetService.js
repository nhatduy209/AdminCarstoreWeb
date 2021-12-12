import axios from 'axios';
import {STATUS} from '../Config/Status/Index';

export default class GetService {
  async getAPI(url) {
    try {
      const response = await axios.get(url);

      return {
        data: response.data,
        status: STATUS.SUCCESS,
      };
    } catch (err) {
      console.log('response----', err);
      return {
        data: {},
        status: STATUS.FAIL,
      };
    }
  }

  async getApiWithParam(url, params) {
    try {
      const response = await axios.get(url, {params});
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
