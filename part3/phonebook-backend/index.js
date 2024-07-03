require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const {
	getAll,
	getById,
	getInfo,
	createPerson,
	deletePerson,
	updatePerson,
} = require("./requests/requests")
const { errorHandler } = require("./middleware/errorHandler")

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

// REQUESTS
app.get(`/api/persons`, getAll)
app.get("/api/persons/:id", getById)
app.get("/info", getInfo)
app.post("/api/persons", createPerson)
app.put("/api/persons/:id", updatePerson)
app.delete("/api/persons/:id", deletePerson)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
