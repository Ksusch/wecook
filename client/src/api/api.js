import axios from "axios";

const service = axios.create({
	baseURL: "http://localhost:4000",
	withCredentials: true,
});

export default {
	service: service,
	isLoggedIn() {
		return localStorage.getItem("user") != null;
	},
	getLocalStorageUser() {
		return JSON.parse(localStorage.getItem("user"));
	},
	login(state) {
		return service
			.post("/auth/login", state)
			.then(res => {
				localStorage.setItem("user", JSON.stringify(res.data));
				return res.data;
			})
			.catch(err => console.log(err));
	},
	signup(state) {
		return service
			.post("/auth/signup", state)
			.then(res => {
				localStorage.setItem("user", JSON.stringify(res.data));
				return res.data;
			})
			.catch(err => console.log(err));
	},
	logout() {
		localStorage.removeItem("user");
		return service.get("/logout");
	},
};
