const Person = require("../models/person")

const getAll = async (req, res) => {
	const persons = await Person.find({})
	res.status(200).json(persons)
}

const getById = async (req, res, next) => {
	try {
		await Person.findById(req.params.id).then((person) => {
			if (person) {
				res.status(200).json(person)
			} else {
				res.status(404).send({ error: "Person not found" })
			}
		})
	} catch (error) {
		next(error)
		res.status(500).json({ error: `Server Error - ${error.message}` })
	}
}

const getInfo = async (req, res) => {
	const persons = await Person.find({}).then((persons) => persons)
	const numberOfEntries = persons.length
	const date = new Date()
	res.send(`
	<div>
		<p>Phonebook has info for ${numberOfEntries} people</p>
		<p>${date}</p>
	</div>`)
}

const createPerson = async (req, res) => {
	// Check if body contains name and number
	if (req.body.name && req.body.number) {
		// Check if person already exists - if yes send an error message
		const personExists = await Person.find({ name: req.body.name })
		if (personExists && personExists.length !== 0) {
			res.status(400).json({ error: "person with that name already exists" })
		} else {
			const person = new Person({
				name: req.body.name,
				number: req.body.number.toString(),
			})
			try {
				await person.save()
				res.status(201).json(person)
			} catch (error) {
				res.status(500).json({ error: error.message })
			}
		}
	} else {
		res.status(400).json({ error: "please provide name and number" })
	}
}

const updatePerson = async (req, res) => {
	try {
		const personExists = await Person.find({ name: req.body.name })

		if (!personExists && personExists.length === 0) {
			res.status(404).json({ error: "Person not found" })
		}

		await Person.findByIdAndUpdate(req.params.id, { number: req.body.number })
		res.status(200).json({ message: "Successfully modified number" })
	} catch (error) {
		res.status(500).json({ error: `Server Error: ${error.message}` })
	}
}

const deletePerson = async (req, res) => {
	try {
		await Person.deleteOne({ _id: req.params.id })
		res.status(204).end()
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

module.exports = { getAll, getById, getInfo, createPerson, updatePerson, deletePerson }
