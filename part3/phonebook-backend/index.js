require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")

const app = express()

morgan.token("returndata", (req, res) => {
	return JSON.stringify(req.body)
})

// MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(express.static("dist"))
app.use(morgan(":method :url :status - :total-time[3] ms :returndata"))

const PORT = process.env.PORT || 3001

app.get(`/api/persons`, (req, res) => {
	Person.find({}).then((persons) => res.json(persons))
})

app.get("/api/persons/:id", (req, res) => {
	const id = req.params.id ? Number(req.params.id) : null
	if (id) {
		const person = persons.find((p) => p.id === id)
		if (person) {
			res.json(person)
		} else {
			res.status(404).end()
		}
	} else {
		res.status(400).end()
	}
})

app.get("/info", (req, res) => {
	const numberOfEntries = persons.length
	const date = new Date()
	res.send(`
	<div>
		<p>Phonebook has info for ${numberOfEntries} people</p>
		<p>${date}</p>
	</div>`)
})

app.post("/api/persons", (req, res) => {
	const body = req.body
	// Check if body contains name and number
	if (body.name && body.number) {
		// Check if person already exists - if yes send an error message
		// const personExists = Person.find({ name: body.name })
		// if (personExists) {
		// res.status(400).json({ error: "person already exists" })
		// } else {
		const person = new Person({
			name: body.name,
			number: body.number.toString(),
		})
		person
			.save()
			.then(() => res.status(201).json(person))
			.catch((err) => res.status(500).json({ error: err.message }))
		// }
	} else {
		res.status(400).json({ error: "please provide name and number" })
	}
})

app.delete("/api/persons/:id", (req, res) => {
	const id = req.params.id ? Number(req.params.id) : null
	if (id) {
		persons = persons.filter((p) => p.id !== id)
		res.status(204).end()
	} else {
		res.status(400).end()
	}
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
