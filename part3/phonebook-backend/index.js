const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()

morgan.token("returndata", (req, res) => {
	return JSON.stringify(req.body)
})

// MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(morgan(":method :url :status - :total-time[3] ms :returndata"))

const PORT = 3001

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
]

const generateId = () => {
	return Math.floor(Math.random() * 1000000)
}

app.get("/api/persons", (req, res) => {
	res.json(persons)
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
		const personExists = persons.find((p) => p.name === body.name)
		if (personExists) {
			res.status(400).json({ error: "person already exists" })
		} else {
			const person = {
				id: generateId(),
				name: body.name,
				number: body.number.toString(),
			}
			persons = persons.concat(person)
			res.status(201).json(person)
		}
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
