//@ts-nocheck
import axios from 'axios';
import {REACT_APP_API_URL} from '@env';
import {AsyncStorage} from "react-native";
const TIMEOUT =  120 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = REACT_APP_API_URL;
const setupAxiosInterceptors = onUnauthenticated => {
    const cancels = {};
  const onRequestSuccess = config => {
    const token = AsyncStorage.getItem('jhi-authenticationToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.dontCancel) {
      return config;
    }

    const cancelToken = axios.CancelToken.source();
    config.cancelToken = cancelToken.token;

    const key = `${config.method}::${config.url}`;
    if (cancels[key]) {
      cancels[key]();
    }
    cancels[key] = cancelToken.cancel;

    return config;
  };
  const onResponseSuccess = response => response;
  const onResponseError = err => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 401) {
      onUnauthenticated();
    }

    if (!axios.isCancel(err)) {
      return Promise.reject(err);
    }
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
