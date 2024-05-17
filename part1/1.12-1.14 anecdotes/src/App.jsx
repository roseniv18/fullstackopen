import { useState } from "react"

const MaxVotesAnecdote = ({ anecdotes }) => {
	// Use the reduce method to iterate through the array and find the anecdote with most votes.
	const mostVotes = anecdotes.reduce((max, anecdote) => {
		return anecdote.votes > max.votes ? anecdote : max
	}, anecdotes[0])

	const { text, votes } = mostVotes

	return (
		<div>
			<h3>Anecdote with most votes</h3>
			<p>
				{`"${text}"`} has <strong>{votes} votes</strong>
			</p>
		</div>
	)
}

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well.",
	]

	// Generate and return a whole, random number
	const generateRandom = () => {
		const random = Math.floor(Math.random() * anecdotes.length)
		return random
	}

	/*
		Calling the generateRandom() function on first render,
		ensures that on each page reload a new, random anecdote
		will be displayed.
	*/
	const [selected, setSelected] = useState(generateRandom())
	// Copy anecdotes in a new array of objects with text and votes properties.
	const [anecdotesState, setAnecdotesState] = useState([
		...anecdotes.map((a) => ({ text: a, votes: 0 })),
	])

	const handleVote = () => {
		// Create a new array and modify the selected anecdote's votes
		const newAnecdotes = anecdotesState.map((a) => {
			if (a === anecdotesState[selected]) {
				return { ...a, votes: a.votes + 1 }
			}
			return { ...a }
		})

		setAnecdotesState(newAnecdotes)
	}

	return (
		<div>
			<p>{anecdotesState[selected].text}</p>
			<p>votes: {anecdotesState[selected].votes}</p>
			<button onClick={handleVote}>vote</button>
			<button onClick={() => setSelected(generateRandom())}>next anecdote</button>

			<MaxVotesAnecdote anecdotes={anecdotesState} />
		</div>
	)
}

export default App
