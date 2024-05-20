import { useEffect, useState } from "react"
import axios from "axios"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

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

		// Check if person already exists in phonebook
		if (persons.find((person) => person.name === newName)) {
			alert(`${newName} is already added to the phonebook!`)
			return
		}

		// Add person
		setPersons((prevPersons) => [...prevPersons, { name: newName, number: newNumber }])
		setFilterPersons((prevPersons) => [...prevPersons, { name: newName, number: newNumber }])
		// Clear inputs
		setNewInput({ newName: "", newNumber: "" })
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
				<Persons persons={filterPersons} />
			</ul>
			<div>debug newName: {newInput.newName}</div>
			<div>debug newNumber: {newInput.newNumber}</div>
			<div>debug filterName: {filterName}</div>
		</div>
	)
}

export default App
