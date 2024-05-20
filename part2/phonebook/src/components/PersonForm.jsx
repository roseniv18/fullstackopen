const PersonForm = ({ handleSubmit, handleNewInputChange, newInput }) => {
	const { newName, newNumber } = newInput
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="name">Name: </label>{" "}
				<input type="text" name="newName" value={newName} onChange={handleNewInputChange} />
			</div>
			<div>
				<label htmlFor="number">Number: </label>{" "}
				<input type="text" name="newNumber" value={newNumber} onChange={handleNewInputChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

export default PersonForm
