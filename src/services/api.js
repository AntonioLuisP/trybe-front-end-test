import axios from "axios";

//objeto para para requisitar informações de uma api
const api = axios.create({
	baseURL: "https://swapi-trybe.herokuapp.com/api/",
});

export default api; 