const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://greecehalf:${password}@ac-3dhnf1l-shard-00-00.dxhpjcs.mongodb.net:27017,ac-3dhnf1l-shard-00-01.dxhpjcs.mongodb.net:27017,ac-3dhnf1l-shard-00-02.dxhpjcs.mongodb.net:27017/noteApp?ssl=true&replicaSet=atlas-e3ybpv-shard-0&authSource=admin&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)
    .then(() => console.log('connected to MongoDB'))
    .catch(error => console.log('connection error:', error.message))

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'HTML is easy',
    important: true,
})

note.save().then(() => {
    console.log('note saved!')
    mongoose.connection.close()
})

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})