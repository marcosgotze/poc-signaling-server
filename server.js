const io = require('socket.io')(3007, { cors: { origin: '*' } })
console.log("Up on port 3007!")

io.on('connection', socket => {
  console.log('Usuário conectado:', socket.id)

  socket.on('join-room', roomId => {
    socket.join(roomId)
    console.log(`Usuário ${socket.id} entrou na sala ${roomId}`)
  })

  socket.on('offer', (roomId, offer) => {
    console.log('Oferta recebida:', offer)
    socket.to(roomId).emit('offer', offer)
  })

  socket.on('answer', (roomId, answer) => {
    console.log('Resposta recebida:', answer)
    socket.to(roomId).emit('answer', answer)
  })

  socket.on('candidate', (roomId, candidate) => {
    console.log('ICE candidate recebido:', candidate)
    socket.to(roomId).emit('candidate', candidate)
  })

  socket.on('disconnect', () => {
    console.log(`Usuário desconectado: ${socket.id}`)
  })

  socket.on('error', (err) => {
    console.error('Erro no socket:', err)
  })
  
  socket.on('chat-message', ({ roomId, text }) => {
    console.log(`Mensagem recebida na sala ${roomId}:`, text)
    socket.to(roomId).emit('chat-message', {
      user: `viewer-${socket.id.slice(0, 4)}`,
      text
    })
  })
})


