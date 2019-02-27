import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true
});

export default {
  service: service,
  login(email, password) {
    let data = {
      email: email,
      password: password
    };
    return service
      .post('/auth/login', data)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  },
  signup(email, password, address, name) {
    let data = {
      email: email,
      password: password,
      address: address,
      name: name
    };
    return service
      .post('/auth/signup', data)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }
};
