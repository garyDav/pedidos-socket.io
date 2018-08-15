'use strict'

const express = require('express'),
      app = express(),
      http = require('http').createServer(app),
      io = require('socket.io')(http),
      port = process.env.PORT || 3000,
      publicDir = express.static(`${__dirname}/public`)
let conexions = 0

app
  .use(publicDir)
  .get('/', (req, res) => {
    res.sendFile(`${publicDir}/index.html`)
  })

http.listen(port, () => {
  console.log('Iniciando Express y Socket.IO en localhost:%d', port)
})

io.on('connection', (socket) => {
  conexions++

  socket.broadcast.emit('connect users', { numbers: conexions })
  
  socket.emit('connect users', { numbers: conexions })
  //socket.emit('hello', { message: 'El server emite hello' })

  socket.on('disconnect', () => {
    conexions--
    console.log(`Conexiones activas ${conexions}`)
    socket.broadcast.emit('connect users', { numbers: conexions })
  })
})
