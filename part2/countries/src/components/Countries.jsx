import { useState } from 'react'
import Country from './Country'

const Countries = ({ countries }) => {
    const [selected, setSelected] = useState(null)

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (countries.length > 1) {
        return (
            <div>
                {countries.map(country => (
                    <div key={country.cca3}>
                        {country.name.common}
                        <button onClick={() => setSelected(country)}>show</button>
                    </div>
                ))}
                {selected && <Country country={selected} />}
            </div>
        )
    }

    if (countries.length === 1) {
        return <Country country={countries[0]} />
    }

    return null
}

export default Countries
