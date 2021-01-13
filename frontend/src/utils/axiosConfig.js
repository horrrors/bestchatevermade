import axios from 'axios';
// Next we make an 'instance' of it
const instance = axios.create({
  // .. where we make our configurations
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:9999/api' : ''
});


// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.common['Authorization'] = localStorage.getItem('token')
// Also add/ configure interceptors && all the other cool stuff


export default instance;