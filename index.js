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
app.get("/test" , (req , res , next) =>{
    res.send('{status:200, message:"ok"}');
});


//when the url /time is invoked, answers with: {status:200, message:<TIME>}
app.get("/time" , (req , res , next) =>{
    var currentTime =   new Date().toLocaleTimeString();
    res.send('{status:200, message: ' + currentTime + '}');
});


app.get("/test/:userId" , (req , res , next) =>{
    res.send('{status:200, message:"Hello,' +  req.params.userId + '"}');
});


app.get('/search',(req,res,next) => {
    const search = req.query.s;

    if (typeof search != 'undefined') {
        // Search string applied
        const response = {
    
            status:200, message:"ok", data: search
        };

        res.send(response);
    }
    else {
        const response = {
            status:500, error:true, message: "you have to provide a search"
        };


        res.status(500);
        res.send(response);
    }
});
