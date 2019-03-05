import axios from 'axios';
const ServerUrl = process.env.NODE_ENV === 'production' ? 'hereoku' : 'http://localhost:4000';

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
		return this.service.get('/pet');
	}
	createPet(pet) {
		return this.service.post('/pet', pet);
	}
	updatePet(id, pet) {
		return this.service.put(`/pet/${id}`, pet);
	}
	deletePet(id) {
		return this.service.delete(`/pet/${id}`);
	}
	getEvents() {
		return this.service.get('/event');
	}
	createEvent(event) {
		return this.service.post('/event', event);
	}
	updateEvent(id, event) {
		return this.service.put(`/event/${id}`, event);
	}
	deleteEvent(id) {
		return this.service.delete(`/event/${id}`);
	}
	addImageUrl(url, type, id = null) {
		return this.service.post('/image/add', {
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
