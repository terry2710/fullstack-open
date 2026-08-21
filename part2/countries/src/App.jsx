import { useState, useEffect } from 'react'
import './App.css'
import countryService from './services/countries'
import Countries from './components/Countries'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        countryService
            .getAll()
            .then(data => setCountries(data))
    }, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const countriesToShow = countries.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
    )

    return (
        <div>
            <div>
                find countries <input value={filter} onChange={handleFilterChange} />
            </div>
            <Countries countries={countriesToShow} key={filter} />
        </div>
    )
}

export default App
