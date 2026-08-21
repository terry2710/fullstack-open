const Persons = ({persons, onDelete}) => {
    return (
        <div>
            {persons.map(person => (
                <p key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => onDelete(person.id)}>Delete</button>
                </p>
            ))}
        </div>
    )
}

export default Persons
