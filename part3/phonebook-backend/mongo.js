const mongoose = require("mongoose")

if (process.argv.length < 3) {
	console.log("Provide password!")
	process.exit(1)
}

const password = encodeURIComponent(process.argv[2])

const url = `mongodb+srv://fullstackopen:${password}@cluster0.6r3m4c2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set("strictQuery", false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model("Person", personSchema)

const personName = process.argv[3]
const personNumber = process.argv[4]

if (!personName && !personName) {
	Person.find({}).then((results) => {
		results.forEach((result) => console.log(result))
		mongoose.connection.close()
	})
} else {
	const person = new Person({
		name: personName,
		number: personNumber,
	})

	person.save().then((result) => {
		console.log("Person added to phonebook")
		mongoose.connection.close()
	})
}
