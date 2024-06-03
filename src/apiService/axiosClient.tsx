import axios from 'axios';
import queryString from 'query-string';
if (typeof window === 'undefined') {
    // Chỉ sử dụng dotenv trong môi trường Node.js
    require('dotenv').config();
}

const API_URL = process.env.API_URL;
// import { decode } from "base-64";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { jwtDecode } from 'jwt-decode';
// import { LoginResponseViewModel } from '../ModelView';

// global.atob = decode;

interface JwtPayload {
    // ... các thuộc tính khác ...
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid': string;
    exp: number;
}

const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    let accessToken = await localStorage.getItem('AccessToken');
    // if (await shouldRefreshToken()) {
    //     accessToken = await refreshAccessToken();
    // }
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // console.log(config);
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        // Handle errors
        throw error;
    },
);

// async function shouldRefreshToken() {
//     // Kiểm tra xem token có còn hợp lệ hay không
//     const accessToken = await localStorage.getItem('AccessToken');
//     if (!accessToken) {
//         return false;
//     }

//     const decoded: JwtPayload = jwtDecode(accessToken.toString());
//     const exp = decoded.exp;
//     const now = getUTCNow();
//     const utcJwt = new Date(exp * 1000);

//     return utcJwt < now;
// }

// async function refreshAccessToken(): Promise<string | null> {
//     const userId: number = await getUserIdFromToken();
//     const refreshToken = (await localStorage.getItem('RefreshToken'))?.toString();

//     try {
//         const res = await axios.post(`${API_URL}/Auth/Refresh-Token`, {
//             userId,
//             refreshToken,
//         });

//         // console.log( "day roi "+ userId + refreshToken)
//         if (res.status === 200) {
//             const data: LoginResponseViewModel = res.data;
//             // console.log(data);
//             localStorage.setItem('AccessToken', data.AccessToken);
//             localStorage.setItem('RefreshToken', data.RefreshToken);
//             console.log('Đã làm mới token thành công');
//             return data.AccessToken;
//         } else {
//             console.log('Chuyển trang về đăng nhập');
//             return null;
//         }
//     } catch (e) {
//         console.log('Chưa thể gọi refresh token');
//         return null;
//     }
// }
// async function getUserIdFromToken(): Promise<number> {
//     const accessToken = await AsyncStorage.getItem('AccessToken');

//     // Check if accessToken is present before using it
//     if (!accessToken) {
//         return 0; // or handle the absence of a valid token
//     }

//     const decoded: JwtPayload = jwtDecode(accessToken.toString());
//     return parseInt(decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid']);
// }
// function getUTCNow() {
//     return new Date();
// }
export default axiosClient;
