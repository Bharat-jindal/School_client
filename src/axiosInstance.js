import  axios from 'axios';

const instance = axios.create({
  baseURL: 'https://stark-falls-46965.herokuapp.com',
});
export default instance;