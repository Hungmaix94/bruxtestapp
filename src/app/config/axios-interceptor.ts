//@ts-nocheck
import axios from 'axios';
import { SERVER_API_URL } from 'src/app/config/constants';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

const setupAxiosInterceptors = onUnauthenticated => {
  const cancels = {};
  const onRequestSuccess = config => {
    const token = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
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
