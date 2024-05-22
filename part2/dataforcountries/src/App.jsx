import { useEffect, useState } from "react"
import axios from "axios"

// Endpoints: /all ; /name/${name}
const SERVER_URL = `https://studies.cs.helsinki.fi/restcountries/api`

const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather`
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

function App() {
	const [countries, setCountries] = useState([])
	const [filteredCountries, setFilteredCountries] = useState([])
	const [query, setQuery] = useState("")
	const [fullCountry, setFullCountry] = useState(null)
	const [weatherData, setWeatherData] = useState(null)

	const handleSearch = (e) => {
		const { value } = e.target
		setFullCountry(null)
		setQuery(value)
		const filtered = [...countries].filter((c) => c.name.common.toLowerCase().includes(value))
		setFilteredCountries(filtered)

		if (filtered.length === 1) {
			const country = filtered[0]
			axios.get(`${SERVER_URL}/name/${country.name.common}`).then((res) => {
				setFullCountry(res.data)
			})
			return
		}

		setFullCountry(null)
	}

	const showCountry = (countryName) => {
		axios.get(`${SERVER_URL}/name/${countryName}`).then((res) => setFullCountry(res.data))
	}

	useEffect(() => {
		axios.get(`${SERVER_URL}/all`).then((res) => {
			setCountries(res.data)
			setFilteredCountries(res.data)
		})
	}, [])

	useEffect(() => {
		if (fullCountry) {
			const [lat, lng] = fullCountry.latlng
			axios
				.get(`${WEATHER_API}?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
				.then((res) => setWeatherData(res.data))
		}
	}, [fullCountry])

	return (
		<main>
			<label htmlFor="query">find countries </label>
			<input type="text" id="query" name="query" value={query} onChange={handleSearch} />
			{/* RESULTS */}
			<div>
				{filteredCountries.length > 10 ? (
					<p>Too many matches, specify another filter</p>
				) : (
					filteredCountries.map((country) => (
						<p key={country.ccn3}>
							{country.name.common}{" "}
							<button onClick={() => showCountry(country.name.common.toLowerCase())}>
								show
							</button>
						</p>
					))
				)}
			</div>
			{/* SINGLE COUNTRY DATA */}
			{fullCountry ? (
				<section>
					<h3>{fullCountry.name.common}</h3>
					<p>capital {fullCountry.capital[0]}</p>
					<p>area {fullCountry.area}</p>
					<p>
						<strong>languages: </strong>
					</p>
					<ul>
						{Object.keys(fullCountry.languages).map((languageKey) => (
							<li key={languageKey}>{fullCountry.languages[languageKey]}</li>
						))}
					</ul>
					<img src={fullCountry.flags.png} alt={fullCountry.flags.alt} />

					{weatherData ? (
						<section>
							<h3>Weather in {fullCountry.capital[0]}</h3>
							<p>temperature {weatherData.main.temp} celsius</p>
							<img
								src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
								alt={weatherData.weather[0].description}
								style={{ height: "100px", width: "100px" }}
							/>
							<p>wind {weatherData.wind.speed} m/s</p>
						</section>
					) : (
						<></>
					)}
				</section>
			) : (
				<></>
			)}
		</main>
	)
}

export default App
