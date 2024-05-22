import "../styles/notification.css"

const Notification = ({ type, message }) => {
	return (
		<div className={`container ${type}`}>
			{type ? (
				<p className={`message ${type}`}>
					{type.toUpperCase()}: {message}
				</p>
			) : (
				<h3>Error displaying message</h3>
			)}
		</div>
	)
}

export default Notification
