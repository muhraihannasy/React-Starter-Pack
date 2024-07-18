import axios from 'axios';
import { Environment } from '../config';

const Axios = axios.create({
  baseURL: Environment.APIURL, // Ganti dengan URL dasar API Anda
  timeout: 10000, // Waktu tunggu permintaan (optional)
  headers: {
    'Content-Type': 'application/json'
    // Tambahkan header default lainnya di sini jika diperlukan
  }
});

Axios.interceptors.request.use(
  (config) => {
    // Tambahkan logika untuk memodifikasi permintaan sebelum dikirim, seperti menambahkan token otentikasi
    // const token = localStorage.getItem('token');
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    // Tambahkan logika untuk memproses respons sebelum dikembalikan ke pemanggil
    return response;
  },
  (error) => {
    // Tambahkan logika untuk memproses kesalahan respons
    if (error.response && error.response.status === 401) {
      // Misalnya, hapus token dan arahkan pengguna ke halaman login jika status 401 (Unauthorized)
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default Axios;
