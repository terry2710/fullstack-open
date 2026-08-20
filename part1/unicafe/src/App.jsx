import {useState} from 'react'

const Header = ({text}) => {
    return (
        <h1>{text}</h1>
    )
}

const Button = ({onClick, text}) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    if (props.all === 0) {
        return (
            <div>
                There is no any feedback yet.
            </div>
        )
    }
    return (
        <table>
            <tbody>
            <StatisticLine text="good" value={props.good}/>
            <StatisticLine text="neutral" value={props.neutral}/>
            <StatisticLine text="bad" value={props.bad}/>
            <StatisticLine text="all" value={props.all}/>
            <StatisticLine text="average" value={props.average.toFixed(2)}/>
            <StatisticLine
                text="positive"
                value={`${props.positive.toFixed(2)} %`}
            />
            </tbody>
        </table>
    )
}
const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const all = good + neutral + bad
    const avg = (good - bad) / all
    const pos = (good / all) * 100


    const handleGoodClick = () => {
        const updatedGood = good + 1
        console.log('good before', updatedGood)
        setGood(updatedGood)

    }

    const handleNeutralClick = () => {
        const updatedNeutral = neutral + 1
        console.log('neutral before', updatedNeutral)
        setNeutral(updatedNeutral)

    }

    const handleBadClick = () => {
        const updatedBad = bad + 1
        console.log('bad before', updatedBad)
        setBad(updatedBad)

    }

    return (
        <div>
            <Header text="Give Feedback, please"></Header>
            <Button onClick={handleGoodClick} text='good'/>
            <Button onClick={handleNeutralClick} text='neutral'/>
            <Button onClick={handleBadClick} text='bad'/>
            <Header text="Feedback Statistics"></Header>
            <Statistics good={good}
                        neutral={neutral}
                        bad={bad}
                        all={all}
                        average={avg}
                        positive={pos}/>

        </div>
    )
}

export default App