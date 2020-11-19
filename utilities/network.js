import { BASE_URL, TOKEN_KEY } from "../constants/secrets";
import * as SecureStore from "expo-secure-store";

export const get = (path, opts) => {
  return makeRequest(path, opts);
};

export const put = (path, opts) => {
  return makeRequest(path, {
    method: "PUT",
    params: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  });
};

export const path = (path, opts) => {
  return makeRequest(path, {
    method: "PATH",
    params: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  });
};

export const post = (path, data, opts) => {
  return makeRequest(path, {
    method: "POST",
    params: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  });
};

export const destroy = (path, data, opts) => {
  return makeRequest(path, { method: "DELETE" });
};

export const makeRequest = async (path, opts) => {
  let url = `${BASE_URL}${path}`;
  let method = opts.method || "GET";

  opts.headers = opts.headers || {};
  opts.headers["Accept"] = "application/json";

  const token = await SecureStore.getItemAsync(TOKEN_KEY)

  if (token) {
    opts.headers["Authorization"] = `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    if (opts.headers) {
      Object.keys(opts.headers).forEach(function (key) {
        xhr.setRequestHeader(key, opts.headers[key]);
      });
    }
    var params = opts.params;

    if (params && typeof params === "object") {
      params = Object.keys(params)
        .map(function (key) {
          return (
            encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
          );
        })
        .join("&");
    }
    xhr.send(params);
  });
};
