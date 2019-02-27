import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true
});

export default {
  service: service,
  login(email, password) {
    let data = {
      email: email,
      password: password
    };
    axios
      .post('/auth/login', data)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  },
  signup(email, password, address) {
    let data = {
      email: email,
      password: password,
      address: address
    };
    axios
      .post('/auth/signup', data)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }
};
