import { useEffect, useState } from "react";
import axios from "axios";

export const useApiProgress = (apiMethod, apiPath) => {
  let requestInterceptor, responseInterceptor;

  const [pendingApiCall, setPendingApiCall] = useState(false);

  const updateApiCallFor = (method, url, inProgress) => {
    if (url.startsWith(apiPath) && method === apiMethod) {
      setPendingApiCall(inProgress);
    }
  };
  requestInterceptor = axios.interceptors.request.use((req) => {
    const { url, method } = req;
    updateApiCallFor(method, url, true);
    return req;
  });

  responseInterceptor = axios.interceptors.response.use(
    (resp) => {
      const { url, method } = resp.config;
      updateApiCallFor(method, url, false);
      return resp;
    },
    (err) => {
      const { url, method } = err.config;
      updateApiCallFor(method, url, false);
      throw err;
    }
  );

  useEffect(() => {
    const unregisterInterceptors = () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };

    return unregisterInterceptors();
  }, [apiPath, apiMethod]);

  return pendingApiCall;
};
