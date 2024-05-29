require("dotenv").config()
const mongoose = require("mongoose")

const url = process.env.MONGO_URI

mongoose.set("strictQuery", false)

console.log(`Connecting to ${url}`)

mongoose
	.connect(url)
	.then(() => console.log(`Connected to MongoDB!`))
	.catch((err) => console.error(`Error connecting to MongoDB: ${err.message}`))

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

// Transform _id field to id for frontend. Also hide __v field.
personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const Person = mongoose.model("Person", personSchema)

module.exports = Person
