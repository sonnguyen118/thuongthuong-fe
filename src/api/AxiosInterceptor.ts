import axios, {AxiosInstance} from 'axios';
import {Cookie} from '@utils/Functions'; // Tạo một file Cookie.ts để chứa hàm getAccessTokenFromCookie()

// Tạo một instance mới của Axios với cấu hình interceptor
const axiosInstanceAuthorization: AxiosInstance = axios.create();

// Thêm interceptor trước mỗi request được gửi đi
axiosInstanceAuthorization.interceptors.request.use(
	(config) => {
		const token: string = Cookie.getAccessTokenFromCookie();
		config.headers["Content-Type"] = "application/json"; // Sửa thành "Content-Type" (không có dấu ngoặc kép bên trong)
		config.headers["Authorization"] = `Bearer ${token}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Tạo một instance mới của Axios không có cấu hình interceptor
// Tạo một instance mới của Axios với cấu hình interceptor
const axiosInstanceClient: AxiosInstance = axios.create();

// Thêm interceptor trước mỗi request được gửi đi
axiosInstanceClient.interceptors.request.use((config) => {
	config.headers["Content-type"] = "application/json";
	return config;
});

export {axiosInstanceAuthorization, axiosInstanceClient};
