const Header = ({ course }) => {
	return <h1>{course.name}</h1>
}

const Part = ({ part, exercises }) => {
	return (
		<p>
			{part} {exercises}
		</p>
	)
}

const Total = ({ parts }) => {
	// Calculate total amount of exercises using reduce method.
	const total = parts.reduce((sum, part) => {
		return sum + part.exercises
	}, 0)

	return <p style={{ fontWeight: "bold" }}>Total of {total} exercises</p>
}

const Content = ({ parts }) => {
	return (
		<div>
			{parts.map(({ id, name, exercises }) => (
				<Part key={id} part={name} exercises={exercises} />
			))}

			<Total parts={parts} />
		</div>
	)
}

export const Course = ({ course }) => {
	return (
		<>
			<Header course={course} />
			<Content parts={course.parts} />
		</>
	)
}
