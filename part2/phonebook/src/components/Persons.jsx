const Persons = ({ persons, handleDelete }) => {
	return (
		<ul>
			{persons.map(({ name, number, id }) => (
				<li key={number}>
					{name} {number}
					<button
						style={{ marginLeft: "12px" }}
						onClick={() => handleDelete(id, { name, number })}
					>
						delete
					</button>
				</li>
			))}
		</ul>
	)
}

export default Persons
