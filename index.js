const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

app.get(URL, (req, res, next) => {
    res.send("Ok");
});