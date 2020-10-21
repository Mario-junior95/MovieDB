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


const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

app.get("/movies/create" , (req , res , next) =>{
    res.send('create route');
});

app.get("/movies/read" , (req , res , next) =>{
    res.send({status:200, data:movies});
});

app.get("/movies/update" , (req , res , next) =>{
    res.send('create update');
});

app.get("/movies/delete" , (req , res , next) =>{
    res.send('create delete');
});

app.get("/movies/read/by-date" , (req , res , next) =>{
    res.send({status:200, data:movies.sort(function(a,b){
      return  a.year - b.year;
    })});
});

app.get("/movies/read/by-rating" , (req , res , next) =>{
    res.send({status:200, data:movies.sort(function(a,b){
        return  a.rating - b.rating;
      })});
});

app.get("/movies/read/by-title" , (req , res , next) =>{
    res.send({status:200, data:movies.sort(function(a,b){
        return  a.title.localeCompare(b.title);
      })});
});



