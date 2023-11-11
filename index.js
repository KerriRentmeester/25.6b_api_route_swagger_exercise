const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var movies = [{id:0,name:"Goodfellas"},{id:1,name:"Casino"}];

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// I suspect I can delete the remaining code except for the last line
app.get("/movies", (req,res)=>{
    res.send(movies);
});

app.post("/movie",(req,res)=>{
    movies.push({id:req.body.id, name:req.body.name});  // add the new movie to the list of all top movies.
    res.send(`${JSON.stringify(movies)} created`);  // this will produce specifics: [{"id":0,"name":"Woodshill"},{"id":1,"name":"Fiorellas"}] created
    // res.send(`${movies} created`);  // this will produce the undesirable: [object Object],[object Object] created 
});

app.delete("/movie/:id", (req,res)=>{
    console.log('delete:id:'+req.params.id);
    movies = movies.filter(item=> item.id != req.params.id)
    res.send("movies left:"+JSON.stringify(movies));
})


app.listen(5000,()=>console.log('Listening on 5000'))