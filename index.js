const express = require('express')
const app = express()
const cors = require('cors')

let notes = [
    {
      id: "1",
      content: "SOFA",
      important: true
    },
        {
          id: "2",
          content: "door",
          important: true
        },

            {
              id: "3",
              content: "wood",
              important: true
            }
        ]

 app.use(cors())
app.use(express.json())
 const generateId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
    return String(maxId + 1) 
 }
 


 app.post('/api/notes', (request, response) => {
   const body = request.body
   
   if(!body.content){
  return response.status(400).json({
    error:' content missing'
  })
   }
    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId(),
    }
   
   notes = notes.concat(note)

   response.json(note)
})
app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

        
    app.get('/api/notes/:id', (request, response) => {
       const id = request.params.id
       const note = notes.find(note => note.id === id)
      if(note){
        response.json(note)
      } else{
        response.status(404).end()
      } 
    })
    app.get('/api/notes', (request, response) => {
        response.json(notes)
    })
   const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
 const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
 }
app.use(unknownEndpoint)
