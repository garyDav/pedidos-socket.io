(function(_io) {
  'use strict'
  let io = _io(),
      d = document

  io.on('hello', (data) => {
    console.log(data.message)
  })

  io.on('connect users', (data) => {
    console.log(`Actualizando desde el Servidor. Hay: ${data.numbers} conexiones activas`)

    d.querySelector('#conexions').innerHTML = data.numbers
  })
})(io)
