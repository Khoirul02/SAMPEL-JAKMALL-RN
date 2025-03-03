import axios, { AxiosResponse } from 'axios';

const url: string = 'https://v2.jokeapi.dev/';
const apiManager = axios.create({
  baseURL: url,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Intercept all responses
apiManager.interceptors.response.use(
  async (response: AxiosResponse) => {
    console.log('response', response.data);
    return response;
  },
  (error: any) => {
    console.log(error, 'error API');
    let result = {
      status: 'E',
      message: `Error : ${error}`,
    };
    console.log(error);
    if (error.message === 'Network Error') {
      result = {
        status: 'E',
        message: 'Error : Cek Koneksi Anda.',
      };
    }
    return Promise.reject(new Error(result.message));
  }
);

export default apiManager;
