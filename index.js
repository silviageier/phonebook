const { request, response } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())

//morgan.token('reqBody', function (req, res) { return JSON.stringify(req.body) })
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'))
//app.use(morgan('tiny'))


let persons = [
    {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
    },
    {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
    },
    {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
    },
    {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
    },
    {
    "name": "Silvia Geier",
    "number": "0445150910",
    "id": 5
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Phonebook :)</h1>')
})

app.get('/api/persons', (request,response) => {
    response.json(persons)
})

app.get('/api/persons/:id',(request, response) => {
    const id = Number(request.params.id)
    //console.log(id)
    const person = persons.find(person => person.id === id)
    //console.log(person)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/api/info', (request, response) => {
    //console.log(request.headers)
    const date = new Date()
    //console.log(date)
    response.send(`<p>Phonebook has ${persons.length} people</p>
                    <p>${date}</p>`)
})

app.post('/api/persons', (request, response) => {
    //console.log(persons)
    console.log(request.body)
    const body = request.body
    const id = 5 + Math.floor(Math.random() * 1000)
    //console.log(id)
    //console.log(body)
    if (!body.name) {
        return response.status(400).json({ 
            error: 'name missing' 
        })
    } else if (!body.number) {
        return response.status(400).json({ 
            error: 'number missing' 
        })
    } else if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({ 
            error: 'name already exists' 
        })
    } else {
        const person = {
            name: body.name,
            number: body.number,
            id: id
        }
        //console.log(person)
        persons = persons.concat(person)
        console.log(persons)
        response.status(200).end()
    }
    
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    console.log(persons)
    persons = persons.filter(person => person.id !== id)
    console.log(persons)
    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})