const app = require('./app')

app.listen(3050, () => {
  console.log('Running on port 3050')
})

process.once('SIGUSR2', () => {
  server.close(() => {
    process.kill(process.pid, 'SIGUSR2')
  })
})
