import { useEffect, useState } from "react"
import axios from "axios"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import phonebookService from "./services/phonebookService"

const App = () => {
	const [persons, setPersons] = useState([])
	const [filterPersons, setFilterPersons] = useState([])
	const [newInput, setNewInput] = useState({
		newName: "",
		newNumber: "",
	})
	const [filterName, setFilterName] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
		const { newName, newNumber } = newInput

		const newPerson = {
			name: newName,
			number: newNumber,
		}

		// Check if person already exists in phonebook
		const personExists = persons.find((person) => person.name === newName)
		if (personExists) {
			if (window.confirm(`${newName} already exists! Replace the old number with a new one?`)) {
				handleUpdate(personExists.id, { ...personExists, number: newNumber })
			}
			return
		}

		// Create new person
		phonebookService.create(newPerson).then((res) => {
			setPersons(persons.concat(res.data))
			setFilterPersons(filterPersons.concat(res.data))
			setNewInput({ newName: "", newNumber: "" })
		})
	}

	// Delete person
	const handleDelete = (id) => {
		const nameOfPerson = persons.find((p) => p.id === id).name
		if (window.confirm(`Delete the user ${nameOfPerson}?`)) {
			phonebookService.remove(id).then(() => {
				setPersons((prevPersons) => prevPersons.filter((p) => p.id !== id))
				setFilterPersons((prevPersons) => prevPersons.filter((p) => p.id !== id))
				setNewInput({ newName: "", newNumber: "" })
			})
		}
	}

	// Update person (with PUT method)
	const handleUpdate = (id, newPerson) => {
		console.log(id, newPerson)
		phonebookService.update(id, newPerson).then(() => {
			// Create new updatedPersons array with updated number of person with specified id.
			const updatedPersons = persons.map((person) =>
				person.id === id ? { ...person, number: newPerson.number } : person
			)
			setPersons(updatedPersons)
			setFilterPersons(updatedPersons)
			setNewInput({ newName: "", newNumber: "" })
		})
	}

	// Dynamically handle multiple input fields
	const handleNewInputChange = (e) => {
		// First destructure the name and value properties of the input element
		const { name, value } = e.target
		// Set the value to the correct input element
		setNewInput((prevInput) => ({ ...prevInput, [name]: value }))
	}

	const handleFilterNameChange = (e) => {
		setFilterName(e.target.value)
		const filtered = [...persons].filter((person) =>
			person.name.toLowerCase().includes(e.target.value.toLowerCase())
		)
		setFilterPersons(filtered)
	}

	// FETCH DATA FROM JSON-SERVER
	useEffect(() => {
		axios.get("http://localhost:3001/persons").then((res) => {
			if (res.data) {
				setPersons(res.data)
				setFilterPersons(res.data)
			} else {
				alert("Error fetching data!")
			}
		})
	}, [])

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange} />

			<h2>Add New</h2>
			<PersonForm
				handleSubmit={handleSubmit}
				handleNewInputChange={handleNewInputChange}
				newInput={newInput}
			/>

			<h2>Numbers</h2>
			<ul>
				<Persons persons={filterPersons} handleDelete={handleDelete} />
			</ul>
			<div>debug newName: {newInput.newName}</div>
			<div>debug newNumber: {newInput.newNumber}</div>
			<div>debug filterName: {filterName}</div>
		</div>
	)
}

export default App
