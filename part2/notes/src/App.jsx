import {useState, useEffect} from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'


const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        console.log('effect')
        noteService
            .getAll()
            .then(initNotes => {
                console.log('promise fulfilled')
                setNotes(initNotes)
            })
    }, [])
    console.log('render', notes.length, 'notes')

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
        }

        noteService
            .create(noteObject)
            .then(reNote => {
                console.log(reNote)
                setNotes(notes.concat(reNote))
                setNewNote('')
            })
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const noteToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    const toggleImportanceOf = (id) => {
        console.log(`importance of ${id} needs to be toggled`)
        const note = notes.find(n => n.id === id)
        const changedNote = {...note, important: !note.important}

        noteService
            .update(id, changedNote)
            .then(reNote => {
            setNotes(notes.map(note => note.id === id ? reNote : note))
            })
            .catch(error => {
                alert(
                    `The note "${note.content}" was already deleted from server.`
                )
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>

            <ul>
                {noteToShow.map(note =>
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() =>
                            toggleImportanceOf(note.id)}
                    />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App