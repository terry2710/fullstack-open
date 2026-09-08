const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log('usage:')
    console.log('  node mongo.js <password>                 -> query all persons')
    console.log('  node mongo.js <password> <name> <number> -> add a person')
    console.log('  (if name contains spaces, wrap it in quotes, e.g. "Arto Vihavainen")')
    process.exit(1)
}

const password = process.argv[2]

// Toggle this when switching networks:
// true  -> works on library WiFi / most home networks
// false -> works on mobile hotspot (SRV DNS lookup fails there)
const USE_SRV = true

const url = USE_SRV
    ? `mongodb+srv://greecehalf:${password}@cluster0.dxhpjcs.mongodb.net/phonebook?appName=Cluster0`
    : `mongodb://greecehalf:${password}@ac-3dhnf1l-shard-00-00.dxhpjcs.mongodb.net:27017,ac-3dhnf1l-shard-00-01.dxhpjcs.mongodb.net:27017,ac-3dhnf1l-shard-00-02.dxhpjcs.mongodb.net:27017/phonebook?ssl=true&replicaSet=atlas-e3ybpv-shard-0&authSource=admin&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)
    .catch(error => console.log('connection error:', error.message))

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(p => {
            console.log(p.name, p.number)
        })
        mongoose.connection.close()
    })
} else {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    person.save().then(() => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}