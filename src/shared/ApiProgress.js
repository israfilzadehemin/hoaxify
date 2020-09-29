import { useEffect, useState } from "react";
import axios from "axios";

export const useApiProgress = (apiPath) => {
  const [pendingApiCall, setPendingApiCall] = useState();

  useEffect(() => {
    let requestInterceptor, responseInterceptor;

    const updateApiCallFor = (url, inProgress) => {
      if (url === apiPath) {
        setPendingApiCall(inProgress);
      }
    };

    const registerInterceptors = () => {
      requestInterceptor = axios.interceptors.request.use((req) => {
        updateApiCallFor(req.url, true);
        return req;
      });

      responseInterceptor = axios.interceptors.response.use(
        (resp) => {
          updateApiCallFor(resp.config.url, false);
          return resp;
        },
        (err) => {
          updateApiCallFor(err.config.url, false);
          throw err;
        }
      );
    };

    const unregisterInterceptors = () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };

    registerInterceptors();

    return unregisterInterceptors();
  });

  return pendingApiCall;
};
