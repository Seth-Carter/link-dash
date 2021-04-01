const app = require('./app')

app.listen(3000, () => {
  console.log('Running on port 3000')
})

process.once('SIGUSR2', () => {
  process.kill(process.pid, 'SIGUSR2')
})
