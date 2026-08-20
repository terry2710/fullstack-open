import Course from './components/Course.jsx'

const Header = ({name}) => {
    return <h1>{name}</h1>
}


const App = ({courses}) => {

    return (
        <div>
            <Header name='Web development curriculum'/>
            {courses.map(course => (
                <Course key={course.id} course={course}/>
            ))}
        </div>

    )

}

export default App
