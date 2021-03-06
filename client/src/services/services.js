import axios from 'axios';
const ServerUrl =
	process.env.NODE_ENV === 'production'
		? 'https://wepetevents.herokuapp.com'
		: 'http://localhost:4000';

class ApiService {
	constructor() {
		this.service = axios.create({
			baseURL: ServerUrl + '/api',
			withCredentials: true
		});
	}
	updateUser(user) {
		return this.service.put('/user', user);
	}
	getPets() {
		return this.service.get('/pets').then(res => res.data);
	}
	createPet(pet) {
		return this.service.post('/pets', pet);
	}
	updatePet(id, pet) {
		return this.service.put(`/pets/${id}`, pet);
	}
	deletePet(id) {
		return this.service.delete(`/pets/${id}`);
	}
	getEvents() {
		return this.service.get('/events').then(res => res.data);
	}
	createEvent(event) {
		return this.service.post('/events', event);
	}
	updateEvent(id, event) {
		return this.service.put(`/events/${id}`, event);
	}
	deleteEvent(id) {
		return this.service.delete(`/events/${id}`);
	}
	getParticipants(id) {
		return this.service.get(`/participants/${id}`).then(res => res.data);
	}
	addParticipant(id) {
		return this.service.post(`/participants/${id}`);
	}
	removeParticipant(id) {
		return this.service.delete(`/participants/${id}`);
	}
	addImageUrl(url, type, id = null) {
		return this.service.post('/image', {
			imageUrl: url,
			model: type,
			owner: id
		});
	}
}

class AuthService {
	constructor() {
		this.service = axios.create({
			baseURL: ServerUrl + '/auth',
			withCredentials: true
		});
	}
	login(state) {
		return this.service.post('/login', state);
	}
	signup(state) {
		return this.service.post('/signup', state);
	}
	logout() {
		return this.service.get('/logout');
	}
	verify() {
		return this.service.get('/verifyAuthentication');
	}
	confirmEmail(token) {
		return this.service.post('/confirm', { token: token });
	}
}

class StorageService {
	set(key, obj) {
		localStorage.setItem(key, JSON.stringify(obj));
	}
	get(key) {
		return JSON.parse(localStorage.getItem(key));
	}
	remove(key) {
		localStorage.removeItem(key);
	}
}

export { ServerUrl as default, ApiService, AuthService, StorageService };
