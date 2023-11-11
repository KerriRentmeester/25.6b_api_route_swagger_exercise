//25.6b change all restaurants to movies
// GET, POST, & PATCH routes should only be in the app.js file, as it is responsible for defining the routes and handling the logic associated with those routes.
const express = require('express');
//const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var movies = [{id:0,name:"Goodfellas"},{id:1,name:"Casino"}];

const app = express();
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Top Movies API",
            version: "1.0.0"
        }
    },
        apis: ["app.js"]  // pointing to this file
};

/**
 * @swagger
 * /movies:
 *      get:
 *          summary: get all movies
 *          produces:
 *              application/json
 *      responses:
 *          200: success
 *          description : an array of movies
 *          schema:
 *              $ref: "#definitions/movie"
 *
 *
 */


const swaggerDocs = swaggerDocument(swaggerOptions);
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/movies", (req,res)=> {
    res.send(movies);
});

/**
 * @swagger
 * /movie:
 *      post:
 *          summary: add a movie
 *          requestBody:
 *              $ref: '#/components/requestBodies/MovieBody'
 *          required:
 *              -id:
 *              -name:
 *          responses:
 *              201:
 *                  description: added movie
 *
 */

app.post("/movie",(req,res)=>{
    res.send(`${req.body.name} created`);
});

app.patch("/movies/:id", (req, res) => {
    const movieId = req.params.id;

    // Find the index of the movie with the given ID in the 'movies' array
    const movieIndex = movies.findIndex(movie => movie.id == movieId);

    // Check if the movie with the given ID exists
    if (movieIndex !== -1) {
        // Update the movie title based on the provided 'req.body'
        movies[movieIndex].name = req.body.name;

        // Send a success response
        res.send("Movie updated successfully");
    } else {
        // If the movie with the given ID doesn't exist, send a not found response
        res.status(404).send("Movie not found");
    }
});

/**
 * @swagger
 * /movies/{id}:
 *      patch:
 *          tags:
 *              - Movies
 *          summary: Update a movie by ID
 *          parameters:
 *              - name: id
 *              in: path
 *              required: true
 *              description: ID of the movie to be updated
 *              type: integer
 *          requestBody:
 *              $ref: '#/components/requestBodies/MovieBody'
 *          produces:
 *              - application/json
 *          responses:
 *              200:
 *                  description: Movie updated successfully
 *                  schema:
 *                      $ref: "#definitions/movie"
 *              404:
 *                  description: Movie not found
 *
 */

app.listen(5000, ()=>console.log('Listening on 5000'));