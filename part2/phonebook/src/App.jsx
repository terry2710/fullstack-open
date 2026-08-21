import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'
import Filter from './components/Filter'
import Notification from "./components/Notification";
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

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
        personService
            .getAll()
            .then(initPersons => {
                console.log('promise fulfilled')
                setPersons(initPersons)
            })
    }, [])
    console.log('render', persons.length, 'persons')

    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)


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

        const existingPerson = persons.find(
            person => person.name === newName
        )

        if (existingPerson) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const changedPerson = {...existingPerson, number: newNum}

                personService
                    .update(existingPerson.id, changedPerson)
                    .then(returnedPerson => {
                        setMessage(`New number has been added to ${existingPerson.name}`)
                        setTimeout(() => setMessage(null), 5000)
                        setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
                        setNewName('')
                        setNewNum('')
                    })
                    .catch(error => {
                        setErrorMessage(`${existingPerson.name} was already removed from server`)
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                        setPersons(persons.filter(p => p.id !== existingPerson.id))
                    })
            }
            return
        }

        const personObject = {
            name: newName,
            number: newNum
        }

        personService
            .create(personObject)
            .then(rePerson => {
                setMessage(`${newName} has been added`)
                setTimeout(() => setMessage(null), 5000)
                setPersons(persons.concat(rePerson))
                setNewName('')
                setNewNum('')
            })
    }

    const deletePerson = (id) => {
        const person = persons.find(p => p.id === id)
        if (window.confirm(`Delete ${person.name}`)) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== id))
                    setMessage(`${person.name} has been successfully removed`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setErrorMessage(`${person.name} was already removed from server`)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                    setPersons(persons.filter(p => p.id !== id))
                })
        }

    }


    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={message} type="notification"/>
            <Notification message={errorMessage} type="error"/>
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
            <Persons
                persons={personsToShow}
                onDelete={deletePerson}

            />
        </div>
    )
}

export default App
