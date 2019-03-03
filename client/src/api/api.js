import axios from "axios";
const ServerUrl = process.env.NODE_ENV === 'production' ? "hereoku" : "http://localhost:4000"

// const SocketServerUrl = process.env.NODE_ENV === 'production' ? "/auth" : "http://localhost:4000/auth"
// TODO: update this with heroku application address
class ApiService {
	constructor() {
		this.service = axios.create({
			baseURL: ServerUrl + "/api",
  			withCredentials: true
		})	
	}
}

class AuthService {
	constructor() {
		this.service = axios.create({
			baseURL: ServerUrl + "/auth",
  			withCredentials: true
		})
	}
	login(state) {
		return this.service.post("/login", state)
	}
	signup(state) {
		return this.service.post("/signup", state)
	}
	logout() {
		return this.service.get("/logout");
	}
	verify() {
		return this.service.get("/verifyAuthentication")
	}
	confirmEmail(token) {
		return this.service.post("/confirm", {token: token} )
	}
}

class StorageService {
	set(key, obj) {
		localStorage.setItem(key, JSON.stringify(obj))
	}
	get(key) {
		return JSON.parse(localStorage.getItem(key)) 
	}
	remove(key) {
		localStorage.removeItem(key)
	}
}

export {
	ServerUrl as default,
	ApiService,
	AuthService,
	StorageService
}