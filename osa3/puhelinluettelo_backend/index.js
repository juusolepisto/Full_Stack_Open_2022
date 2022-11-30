const { response, request } = require('express')
const express = require('express')
var morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

let notes = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const date = new Date()
    const currentDate = date.toString()
    response.send(`<p>
    Phonebook has info from ${notes.length} people <br> ${currentDate}</p>`
    )
})

app.get('/api/persons', (request, response) => {
    response.json(notes)
})

app.get('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    const Id = notes.length > 0
        ? Math.floor(Math.random() * 30)
        : 0
    return Id
}

app.delete('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request,response) => {
    const body = request.body
    const existingName = notes.find(note => note.name === body.name)

    if (!body.name || !body.number) {
        return response.status(404).json({
            error: 'nimi tai numero puuttuu'
        })
    }
    if (existingName) {
        return response.status(404).json({
            error: 'nimen pitää olla uniikki'
        })
    }

    const note = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    
    notes = notes.concat(note)

    response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})