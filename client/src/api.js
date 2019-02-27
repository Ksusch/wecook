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

  createOffering(state){
    let data={
      title: state.title,
      description: state.description,
      quantity: state.quantity,
      fromDate: state.fromDate,
      toDate: state.toDate,
      ingredients: state.ingredients,
      category: state.category,
      image: state.image,
      delivery: state.delivery
    };
    return service
      .post('/add/offering', data)
      .then(response => console.log(response))
      .catch(err => console.log(err));

  }
  
};


