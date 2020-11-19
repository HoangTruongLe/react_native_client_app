import * as SecureStore from "expo-secure-store";
import * as AuthSession from "expo-auth-session";

import { post } from "./network";
import { TOKEN_KEY, BASE_URL, APP_ID } from "../constants/secrets";

export const isLoggedIn = () => {
  return new Promise((resolve, reject) => {
    SecureStore.getItemAsync(TOKEN_KEY)
      .then((res) => {
        if (res) {
          const transformedData = JSON.parse(res);
          const expDate = new Date(transformedData.expiredDate).getTime();
          if (
            transformedData &&
            transformedData.expiredDate &&
            expDate > new Date().getTime()
          ) {
            console.log(res);
            resolve(true);
          }
        } else {
          resolve(false);
        }
      })
      .catch((err) => reject(err));
  });
};

export const login = async () => {
  let redirectUri = AuthSession.getRedirectUrl();
  let result = await AuthSession.startAsync({
    authUrl:
      `${BASE_URL}/oauth/authorize?response_type=code` +
      `&client_id=${APP_ID}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}`,
  }).catch((err) => console.log(err));

  return new Promise((resolve, reject) => {
    post("/oauth/token", {
      grant_type: "authorization_code",
      code: result.params.code,
      client_id: APP_ID,
      redirect_uri: redirectUri,
    })
      .then((json) => {
        const data = {
          token: json.access_token,
          expiredDate: expiredDate(json.expires_in),
        };
        SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(data));
        resolve(json);
      })
      .catch((err) => {
        reject(json.err);
      });
  });
};

const expiredDate = (expires_in) => {
  var today = new Date();
  return new Date(today.getTime() + expires_in * 1000);
};

export const logout = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY).catch((err) => console.log(err));
};
