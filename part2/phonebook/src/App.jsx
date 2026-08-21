import {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    // const [persons, setPersons] = useState([
    //     {name: 'Arto Hellas', number: '040-123-456', id: 1},
    //     {name: 'Ada Lovelace', number: '394-453-223', id: 2},
    //     {name: 'Dan Abramov', number: '102-403-345', id: 3},
    //     {name: 'Mary Poppendieck', number: '390-283-122', id: 4}
    // ])

    const [persons, setPersons] = useState([])
    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])
    console.log('render', persons.length, 'persons')

    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    const [newFilter, setNewFilter] = useState('')


    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }
    const handleNumChange = (event) => {
        console.log(event.target.value)
        setNewNum(event.target.value)
    }
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const personsToShow = persons.filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
    )

    const addPerson = (event) => {
        event.preventDefault()

        // const numberPattern = /^\d{3}-\d{3}-\d{3}$/
        //
        // if (!numberPattern.test(newNum)) {
        //     alert('Number must use the format xxx-xxx-xxx')
        //     return
        // }

        const nameExists = persons.some(
            person => person.name === newName
        )
        if (nameExists) {
            alert(`${newName} has already existed.`)
            return
        }

        const nameObject = {
            name: newName,
            number: newNum,
            id: String(persons.length + 1),
        }
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNum('')
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter
                value={newFilter}
                onChange={handleFilterChange}
            />
            <h2>Add a new</h2>
            <PersonForm
                onSubmit={addPerson}
                newName={newName}
                newNumber={newNum}
                onNameChange={handleNameChange}
                onNumberChange={handleNumChange}
            />
            <h2>Numbers</h2>
            <Persons persons={personsToShow}/>
        </div>
    )
}

export default App
