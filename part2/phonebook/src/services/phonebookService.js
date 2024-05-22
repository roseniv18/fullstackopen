import axios from "axios"

const SERVER_URL = "http://localhost:3001"

const create = async (newPerson) => {
	return axios.post(`${SERVER_URL}/persons`, newPerson).then((res) => res)
}

const remove = async (id) => {
	return axios.delete(`${SERVER_URL}/persons/${id}`).then((res) => res)
}

const update = async (id, newPerson) => {
	return axios.put(`${SERVER_URL}/persons/${id}`, newPerson).then((res) => res)
}

export default {
	create,
	remove,
	update,
}
