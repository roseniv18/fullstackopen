import axios from "axios"

const SERVER_URL = "http://localhost:3001"

const create = async (newPerson) => {
	if (!newPerson.name || !newPerson.number) {
		throw new Error("Please fill out all fields!")
	}
	return axios.post(`${SERVER_URL}/persons`, newPerson).then((res) => res)
}

const remove = async (id) => {
	return axios
		.delete(`${SERVER_URL}/persons/${id}`)
		.then((res) => res)
		.catch((err) => {
			if (err.response.status === 404) {
				throw new Error("Person does not exist in list or was already deleted!")
			} else {
				throw err
			}
		})
}

const update = async (id, updatedPerson) => {
	return axios
		.put(`${SERVER_URL}/persons/${id}`, updatedPerson)
		.then((res) => res)
		.catch((err) => {
			if (err.response.status === 404) {
				throw new Error("Person does not exist in list or was already deleted!")
			} else {
				throw err
			}
		})
}

export default {
	create,
	remove,
	update,
}
