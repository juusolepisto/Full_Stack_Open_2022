const { response, request } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

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