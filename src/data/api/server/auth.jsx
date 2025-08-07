import decode from "jwt-decode";
import cookies from "next-cookies";
import { isNil } from "lodash";

const auth = {};

const deleteCookie = (name) => {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
};

auth.clearToken = () => {
  deleteCookie("authtoken");
  deleteCookie("role");
  deleteCookie("refreshToken");
};

auth.getToken = () => {
  const allCookies = cookies();
  if (allCookies.authtoken === undefined || allCookies.authtoken === "''") {
    return false;
  } else {
    return allCookies.authtoken;
  }
};
auth.getRefreshToken = () => {
  const allCookies = cookies();
  if (
    allCookies.refreshToken === undefined ||
    allCookies.refreshToken === "''"
  ) {
    return false;
  } else {
    return allCookies.refreshToken;
  }
};

auth.getRole = () => {
  const allCookies = cookies();
  if (allCookies.role === undefined || allCookies.role === "''") {
    return false;
  } else {
    return allCookies.role;
  }
};

auth.logout = () => {
  auth.clearToken();
};

const getTokenExpirationDate = (encodedToken) => {
  try {
    const token = decode(encodedToken);
    // const token = { exp: 1588431980 }
    if (!token.exp) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
  } catch (error) {
    auth.clearToken();
    return false;
  }
};

const decodeToken = (encodedToken) => {
  try {
    const token = decode(encodedToken);
    return token;
  } catch (error) {
    auth.clearToken();
    return false;
  }
};

const isTokenExpired = (token) => {
  const tokenExpirationDate = getTokenExpirationDate(token);
  if (tokenExpirationDate < new Date()) {
    if (auth.getRefreshToken()) {
      const refreshToken = auth.getRefreshToken();
      const refreshTokenExpirationDate = getTokenExpirationDate(refreshToken);
      if (refreshTokenExpirationDate < new Date()) return true;
    }
  }
  return false;
};

auth.isLoggedIn = () => {
  const token = auth.getToken();
  if (token) {
    if (!isTokenExpired(token)) {
      return true;
    } else {
      auth.clearToken();
      return false;
    }
  } else {
    return false;
  }
};

auth.getDecodeToken = (tokenParam) => {
  const token = isNil(tokenParam) ? auth.getToken() : tokenParam;
  if (token) {
    const decode = decodeToken(token);
    return decode;
  } else {
    return null;
  }
};

export default auth;
