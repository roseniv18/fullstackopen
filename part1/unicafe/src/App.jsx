import { useState } from "react"

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}

const Statistics = ({ good, neutral, bad }) => {
	const all = good + neutral + bad
	// Average displays a value between -1 and 1 (worst and best respectively)
	const average = (good - bad) / all
	// Percentage of positive reviews
	const positive = (good / all) * 100

	// Check if all is not a number or is less than 0; if yes, no feedback is given
	if (!all || all <= 0) {
		return (
			<div>
				<h3>Statistics</h3>
				<p>Not enough feedback given</p>
			</div>
		)
	}

	return (
		<div>
			<h3>Statistics</h3>
			<table>
				<tbody>
					<StatisticLine text="good" value={good} />
					<StatisticLine text="neutral" value={neutral} />
					<StatisticLine text="bad" value={bad} />
					<StatisticLine text="all" value={all} />
					<StatisticLine text="average" value={average} />
					<StatisticLine text="positive" value={`${positive} %`} />
				</tbody>
			</table>
		</div>
	)
}

const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}>{text}</button>
}

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const handleGood = () => {
		setGood(good + 1)
	}

	const handleNeutral = () => {
		setNeutral(neutral + 1)
	}

	const handleBad = () => {
		setBad(bad + 1)
	}

	return (
		<div>
			<h3>give feedback</h3>

			<Button handleClick={handleGood} text="good" />
			<Button handleClick={handleNeutral} text="neutral" />
			<Button handleClick={handleBad} text="bad" />

			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

export default App
