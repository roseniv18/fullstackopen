const Persons = ({ persons }) => {
	return (
		<ul>
			{persons.map(({ name, number }) => (
				<li key={number}>
					{name} {number}
				</li>
			))}
		</ul>
	)
}

export default Persons
