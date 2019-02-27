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
      .then(res => {
        localStorage.setItem("user", JSON.stringify(res.data))
        return res.data
      })
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
      .then(res => {
        localStorage.setItem("user", JSON.stringify(res.data))
        return res.data
      })
      .catch(err => console.log(err));
  },

  isLoggedIn() {
    return JSON.parse(localStorage.getItem("user"))
  }
};
