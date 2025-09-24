import 'dotenv/config'; //not sure if necessary but it was in users.test.js
import express from 'express';
import * as exercisesModel from './exercises_model.mjs';

const app = express();
//const PORT = 3000; // already set in .env

app.use(express.json());

exercisesModel.connect(true);

///////////////////////////////////////////////////////////////////////
/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}
///////////////////////////////////////////////////////////////////////
// create using POST /exercises
app.post("/exercises", async (req, res) => {
    //request
    //must validate body
    //name must contain at least one character
    //reps must be int > 0
    //weight must be int > 0
    //unit must be str = "kgs" or "lbs"
    //date must be in proper format (use provided function)
    //no path param or queries
    
    //input validation
    let requestValid = true;
    let propCounter = 0;

    //do object keys length check now
    let tempKeys = Object.keys(req.body);
    let tempLength = tempKeys.length;

    if (tempLength !== 5) {
        requestValid = false;
    }

    if (typeof req.body.name !== "string") {
        requestValid = false;
    }
    else {
        if (req.body.name.length <= 0) {
            requestValid = false;
        }
        else {
            //true
            propCounter += 1;
        }
    }

    if (typeof req.body.reps !== "number") {
        requestValid = false;
    }
    else {
        if (Number.isInteger(req.body.reps) !== true) {
            requestValid = false;
        }
        else {
            if (req.body.reps <= 0) {
                requestValid = false;
            }
        }
    }
    //////////////////////////////////////////
    if (typeof req.body.weight !== "number") {
        requestValid = false;
    }
    else {
        if (Number.isInteger(req.body.weight) !== true) {
            requestValid = false;
        }
        else {
            if (req.body.weight <= 0) {
                requestValid = false;
            }
        }
    }
    //////////////////////////////////////////
    if (typeof req.body.unit !== "string") {
        requestValid = false;
    }
    else {
        if (req.body.unit !== "kgs" && req.body.unit !== "lbs") {
            requestValid = false;
        }
    }
    //////////////////////////////////////////
    if (typeof req.body.date !== "string") {
        requestValid = false;
    }
    else {
        if (isDateValid(req.body.date) !== true) {
            requestValid = false;
        }
    }
    /////end//of//input//validation///////////////////////

    //response
    if (requestValid === true) {
        const exercise = await exercisesModel.createExercise(
            req.body.name,
            req.body.reps,
            req.body.weight,
            req.body.unit,
            req.body.date
        );
        res.status(201).json(exercise);
    }
    else {
        res.status(400).json({"Error": "Invalid request"});
    }
});

app.get("/exercises", async (req, res) => {
    //request
    //path param: None
    //body: None

    //response
    //body: json array containing the entire collection
    //Content-type: application/json
    //Status code: 200
    const returnedExercises = await exercisesModel.findExercises();

    res.status(200);
    res.json(returnedExercises);
});

//Read one using GET /exercises/:id
app.get("/exercises/:id", async (req, res) => {
    //request
    //path param: id of exercise to retrieve
    //body: None
    //query param: None
    const exercise = await exercisesModel.findExerciseById(req.params.id);

    //check to see if anything was returned
    if (exercise === null || exercise === undefined) {
        //then nothing was returned
        let responseObject = { "Error": "Not found" };
        res.status(404);
        res.json(responseObject);
    }
    else {
        res.status(200);
        res.json(exercise);
    }
});

//Update using PUT /exercises/:id
app.put("/exercises/:id", async (req, res) => {
    //request
    //path param: id of document to update
    //body: json object, must validate first
    
    //copied from POST
    //input validation
    let requestValid = true;
    let propCounter = 0;

    //do object keys length check now
    let tempKeys = Object.keys(req.body);
    let tempLength = tempKeys.length;

    if (tempLength !== 5) {
        requestValid = false;
    }

    if (typeof req.body.name !== "string") {
        requestValid = false;
    }
    else {
        if (req.body.name.length <= 0) {
            requestValid = false;
        }
        else {
            //true
            propCounter += 1;
        }
    }

    if (typeof req.body.reps !== "number") {
        requestValid = false;
    }
    else {
        if (Number.isInteger(req.body.reps) !== true) {
            requestValid = false;
        }
        else {
            if (req.body.reps <= 0) {
                requestValid = false;
            }
        }
    }
    //////////////////////////////////////////
    if (typeof req.body.weight !== "number") {
        requestValid = false;
    }
    else {
        if (Number.isInteger(req.body.weight) !== true) {
            requestValid = false;
        }
        else {
            if (req.body.weight <= 0) {
                requestValid = false;
            }
        }
    }
    //////////////////////////////////////////
    if (typeof req.body.unit !== "string") {
        requestValid = false;
    }
    else {
        if (req.body.unit !== "kgs" && req.body.unit !== "lbs") {
            requestValid = false;
        }
    }
    //////////////////////////////////////////
    if (typeof req.body.date !== "string") {
        requestValid = false;
    }
    else {
        if (isDateValid(req.body.date) !== true) {
            requestValid = false;
        }
    }

    if (requestValid === false){
        res.status(400).json({"Error": "Invalid request"});
    }
    else {
        const exercise = await exercisesModel.replaceExercise(
            req.params.id,
            req.body.name,
            req.body.reps,
            req.body.weight,
            req.body.unit,
            req.body.date
        );

        if (exercise.modifiedCount === 0) {
            //no document found or updated
            res.status(404).json({"Error": "Not found"});
        }
        else {
            //1 documents was found and updated
            const exercise2 = await exercisesModel.findExerciseById(req.params.id);
            res.status(200).json(exercise2);
            
            //below method didn't have version tag so just doing it the long way
            //we know it worked so lazy time
            // res.status(200).json(
            //     Object.assign(
            //         Object.assign({}, req.body), {"_id": req.params.id}
            //     )
            // );
            //this should send as json:
            //an empty object with the body assigned to it
            //then it will have the id assigned to it as well
            //then it will return the object to return to the user
        }
    }
});

//DELETE /exercises/:id
app.delete("/exercises/:id", async (req, res) => {
    //path param: id to delete
    const deletedCount = await exercisesModel.deleteById(req.params.id);

    if (deletedCount === 1) {
        res.status(204).json();
    }
    else {
        res.status(404).json({"Error": "Not found"});
    }
});

app.listen(process.env.PORT, () => {
    //usersModel.connect(true);
    console.log(`Server listening on port ${process.env.PORT}...`);
});
