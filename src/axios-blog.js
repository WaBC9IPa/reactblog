import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://bloggy-api.herokuapp.com',
});
export default instance;

