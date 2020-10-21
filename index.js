const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

app.get("/", (req, res, next) => {
    res.send("Ok");
});

//when the url /test is invoked, answers: {status:200, message:"ok"}

app.get("/test" , (reg , res , next) =>{
    res.send('{status:200, message:"ok"}');
});




//when the url /time is invoked, answers with: {status:200, message:<TIME>}
app.get("/time" , (reg , res , next) =>{
    var currentTime =   new Date().toLocaleTimeString();
    res.send('{status:200, message: ' + currentTime + '}');
});