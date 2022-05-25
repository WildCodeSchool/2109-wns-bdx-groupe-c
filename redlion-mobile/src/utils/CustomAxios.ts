import AsyncStorage from '@react-native-async-storage/async-storage';
import setCookie from 'set-cookie-parser';
import axios from 'axios';
import { API_URL } from '@env';

let headers = {};

const customAxios = axios.create({
  baseURL: API_URL,
  headers
});

customAxios.interceptors.request.use(
  async(config) => {
    const session = await AsyncStorage.getItem('sessionId');
    if (config.headers && session) {
      config.headers.cookie = `sessionId=${session}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => {
    const { headers } = response;
    if (headers && headers['set-cookie']) {
      const cookie = setCookie.parse(headers['set-cookie']);
      const sessionId = cookie[0].value;
      if (sessionId) {
        AsyncStorage.setItem('sessionId', sessionId);
      }
    }
    return response.data;
  },
  () => {
    AsyncStorage.removeItem('sessionId');
  }
);

export default customAxios;
