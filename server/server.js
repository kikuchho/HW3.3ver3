import Express from 'express'

import GameRouter from './api/theRoutes.js'

const app = new Express()

// create universal logging route
app.use((req, res, next) => {
  console.log(`${req.method} request at ${req.url}`)
  next()
})

app.use('/data', GameRouter) //when using this routes, it always start with data/games/ etc

// final static file route
app.use(Express.static('./public'))

app.listen(3000, () => {
  console.log('listening on ')
})


