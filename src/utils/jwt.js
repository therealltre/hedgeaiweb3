// import jwtDecode from 'jwt-decode';
// // import { verify, sign } from 'jsonwebtoken';

// //
// import axios from './axios';
// import Cookies from 'js-cookie';

// // ----------------------------------------------------------------------

// const isValidToken = (jwt) => {
//   if (!jwt) {
//     console.log('No access token provided');
//     return false;
//   }

//   try {
//     // Decode the token to access its payload
//     const decoded = jwtDecode(jwt);
//     const userId = decoded.id; // Check if the token contains a valid user ID
//     console.log('User ID from token:', userId);
//     // console.log('decoded token: ', decoded);

//     // // Validate if the decoded token contains a valid user ID
//     // if (!userId) {
//     //   console.log('Invalid token: User ID not found');
//     //   return false; // Token doesn't contain user ID, so it's invalid
//     // }

//     // Check if the token has expired by comparing expiration time
//     const currentTime = Date.now() / 1000;
//     if (decoded.exp <= currentTime) {
//       console.log('Token has expired');
//       return false; // Token has expired
//     }


//     // If the token is valid and contains the correct claims
//     return true;
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return false; // Invalid token if decoding fails
//   }
// };

// const handleTokenExpired = (exp) => {
//   let expiredTimer;

//   window.clearTimeout(expiredTimer);
//   const currentTime = Date.now();
//   const timeLeft = exp * 1000 - currentTime;
//   // console.log(timeLeft);
//   expiredTimer = window.setTimeout(() => {
//     console.log('expired');
//     // You can do what ever you want here, like show a notification
//   }, timeLeft);
// };

// const setSession = (jwt) => {
//   if (jwt) {
//     Cookies.setItem('jwt', jwt);
//     localStorage.setItem('jwt', jwt);
//     // Use a custom header instead of Bearer
//     axios.defaults.headers.common['X-Access-Token'] = jwt;
    
//     // Decode the token and handle expiration
//     const { exp } = jwtDecode(jwt);
//     handleTokenExpired(exp);
//   } else {
//     localStorage.removeItem('jwt');
//     delete axios.defaults.headers.common['X-Access-Token'];
//   }
// };

// // const setSession = (access_token) => {
// //   if (access_token) {
// //     localStorage.setItem('access_token', access_token);
// //     axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
// //     // axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
// //     // This function below will handle when token is expired
// //     const { exp } = jwtDecode(access_token);
// //     handleTokenExpired(exp);
// //   } else {
// //     localStorage.removeItem('access_token');
// //     delete axios.defaults.headers.common['Authorization'];
// //     // delete axios.defaults.headers.common.Authorization;
// //   }
// // };

// export { isValidToken, setSession };

/* eslint-disable no-bitwise */
export const JWT_SECRET = 'jwt-secret-key';
export const JWT_EXPIRES_IN = 3600 * 24 * 2;

export const sign = (payload, privateKey, header) => {
  const now = new Date();
  header.expiresIn = new Date(now.getTime() + header.expiresIn);
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = btoa(
    Array.from(encodedPayload)
      .map((item, key) =>
        String.fromCharCode(
          item.charCodeAt(0) ^ privateKey[key % privateKey.length].charCodeAt(0)
        )
      )
      .join('')
  );

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

export const decode = (token) => {
  const [encodedHeader, encodedPayload, signature] = token.split('.');
  const header = JSON.parse(atob(encodedHeader));
  const payload = JSON.parse(atob(encodedPayload));
  const now = new Date();

  if (now < header.expiresIn) {
    throw new Error('Expired token');
  }

  const verifiedSignature = btoa(
    Array.from(encodedPayload)
      .map((item, key) =>
        String.fromCharCode(
          item.charCodeAt(0) ^ JWT_SECRET[key % JWT_SECRET.length].charCodeAt(0)
        )
      )
      .join('')
  );

  if (verifiedSignature !== signature) {
    throw new Error('Invalid signature');
  }

  return payload;
};

export const verify = (token, privateKey) => {
  const [encodedHeader, encodedPayload, signature] = token.split('.');
  const header = JSON.parse(atob(encodedHeader));
  const payload = JSON.parse(atob(encodedPayload));
  const now = new Date();

  if (now < header.expiresIn) {
    throw new Error('The token is expired!');
  }

  const verifiedSignature = btoa(
    Array.from(encodedPayload)
      .map((item, key) =>
        String.fromCharCode(
          item.charCodeAt(0) ^ privateKey[key % privateKey.length].charCodeAt(0)
        )
      )
      .join('')
  );

  if (verifiedSignature !== signature) {
    throw new Error('The signature is invalid!');
  }

  return payload;
};
