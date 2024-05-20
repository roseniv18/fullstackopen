const Filter = ({ filterName, handleFilterNameChange }) => {
	return (
		<>
			<label htmlFor="filterName">filter shown with</label>
			<input type="text" name="filterName" value={filterName} onChange={handleFilterNameChange} />
		</>
	)
}

export default Filter
