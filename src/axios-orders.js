import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-a4d20.firebaseio.com'
})

export default instance;