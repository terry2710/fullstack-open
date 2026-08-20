import {useState} from 'react'

const Header = (props) => {
    return <h1>{props.header}</h1>
}

const Header2 = (props) => {
    return <h2>{props.header}</h2>
}

const MostVoted = ({anecdote, maxVotes}) => {
    if (maxVotes === 0) {
        return (
            <>
                <Header2 header="There is no votes yet."/>
            </>
        )
    }

    return (
        <>
            <Header2 header="Anecdote with the most likes"/>
            <p>{anecdote}</p>
            <p>has {maxVotes} likes.</p>
        </>
    )
}

const App = () => {
    const anecdoteSet = {
        header: 'Anecdote of the day',
        anecdotes: [
            'If it hurts, do it more often.',
            'Adding manpower to a late software project makes it later!',
            'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
            'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
            'Premature optimization is the root of all evil.',
            'Debugging is twice as hard as writing the code in the first place. Therefore, if you write it as cleverly as possible, you are, by definition, not smart enough to debug it.',
            'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
            'The only way to go fast, is to go well.',
        ],
    }

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(
        Array(anecdoteSet.anecdotes.length).fill(0)
    )

    const showRandomAnecdote = () => {
        const randomIndex = Math.floor(
            Math.random() * anecdoteSet.anecdotes.length
        )
        setSelected(randomIndex)
    }

    const handleVote = () => {
        const votecopy = [...votes]
        votecopy[selected] += 1
        setVotes(votecopy)
    }

    const maxVotes = Math.max(...votes)
    const mostVotedIndex = votes.indexOf(maxVotes)

    return (
        <div>
            <Header header={anecdoteSet.header}/>
            <p>{anecdoteSet.anecdotes[selected]}</p>
            <p>has {votes[selected]} likes.</p>
            <button onClick={handleVote}>Like</button>
            <button onClick={showRandomAnecdote}>Next anecdote</button>
            <MostVoted
                anecdote={anecdoteSet.anecdotes[mostVotedIndex]}
                maxVotes={maxVotes}
            />
        </div>
    )
}

export default App
