const { text } = require('express')
const e = require('express')
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
   title = req.query.title;
   year = parseInt(req.query.year);
   rating = parseFloat(req.query.rating);
   if(!title  || !year || year.length < 4 || isNaN(year) || year < 1888){
       //year < 1888 because the first movie is published in 1888
       var result = "{status:403, error:true, message:'you cannot create a movie without providing a title and a year'}";
       res.send(result);
   }else{
       if(!rating || isNaN(rating)){
        var result = {title :title, year :year ,rating :4};
        movies.push(result)
        res.send(movies);
       }else{
        var result = {title :title, year :year ,rating :rating};
        movies.push(result)
        res.send(movies);
       }
   }
});

app.get("/movies/read" , (req , res , next) =>{
    res.send({status:200, data:movies});
});

app.get("/movies/update" , (req , res , next) =>{
    res.send('create update');
});

app.get("/movies/delete/:id" , (req , res , next) =>{
    var result = "";
    for(var  i = 0 ; i < movies.length ; i++){
        if(movies[i].title === req.params.id){
            movies.splice(i,1);
            result = movies;
        }
    }
    if(result !== ""){
        res.send(result);
    }else{
        res.send("{status:404, error:true, message:'the movie " + req.params.id + " does not exist'}");
    }
    

    

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

app.get("/movies/read/id/:movieId" , (req , res , next) =>{
    var MOVIES = " ";
    // var Arabic = /[\u0600-\u06FF\u0750-\u077F]/;
    // var English = /^[A-Za-z0-9]*$/;
     
    for(var i = 0 ; i < movies.length ; i++){
        if(req.params.movieId.length > 0 && req.params.movieId === movies[i].title && typeof(req.params.movieId) === "string"){
            MOVIES += "title: " + movies[i].title + " year: " + movies[i].year + " rating: " + movies[i].rating;
        }
    }
    if(MOVIES !== " " ){
        res.send("{status:200, data: " + MOVIES + "}");
    }else{
        res.send("{status:404, error :true, message : 'the movie " + req.params.movieId  + " does not exist'}" );
    }
});
