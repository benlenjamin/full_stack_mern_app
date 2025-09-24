import mongoose from 'mongoose';
import 'dotenv/config';

// const MOVIE_DB_NAME = 'movie_db';
// const MOVIE_COLLECTION = 'movies';
const EXERCISE_DB_NAME = 'exercise_db';
const EXERCISE_COLLECTION = 'exercises';

const EXERCISE_CLASS = 'Exercise';

let connection = undefined;
let Exercise = undefined;

/**
 * This function does the following:
 *  1. Connects to the MongoDB server.
 *  2. Drop MOVIE_COLLECTION if asked to do so.
 *  3. Creates a model class for the movie schema.
 * @param {Boolean} dropCollection If true, drop MOVIE_COLLECTION
 */
async function connect(dropCollection){
    try{
        connection = await createConnection();
        console.log("Successfully connected to MongoDB using Mongoose!");
        if(dropCollection){
            await connection.db.dropCollection(EXERCISE_COLLECTION);
        }
        Exercise = createModel();
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

/**
 * Connect to the MongoDB server for the connect string in .env file
 * @returns A connection to the server
 */
async function createConnection(){
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
    return mongoose.connection;
}

function createModel(){
    const exerciseSchema = mongoose.Schema({
        //name: string
        //reps: number
        //weight: number
        //unit: string
        //date: string
        name: {type: String, required: true},
        reps: {type: Number, required: true},
        weight: {type: Number, required: true},
        unit: {type: String, required: true},
        date: {type: String, required: true}
    });
    return mongoose.model(EXERCISE_CLASS, exerciseSchema);
}

// create using POST /exercises
async function createExercise(name, reps, weight, unit, date){
    const exercise = new Exercise(
        {
            name: name,
            reps: reps,
            weight: weight,
            unit: unit,
            date: date
        });
    return exercise.save();
}

// read using GET /exercises
// read one using GET /exercises/:id in the form filter = {_id: id}
const findExercises = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}

const findExerciseById = async (_id) => {
    const result = Exercise.findById(_id);
    return result.exec(); //
}

// update using PUT /exercises/:id
// only update the paramaters that have been provided, will handle in calling function
// check function updateOne // couldn't figure out how to use it properly
async function replaceExercise(_id, name, reps, weight, unit, date){
    const result = await Exercise.replaceOne({_id: _id}, 
        {name: name, reps: reps, weight: weight, unit: unit, date: date});
    //return result.modifiedCount;
    return result;
}

const patchById = async (_id, updatesObject) => {
    const result = Exercise.findByIdAndUpdate(_id, updatesObject, { returnDocument: 'after'});
    return result.exec();
}

// deletebyId first
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({_id: _id});
    return result.deletedCount;
}

// could do deleteMany by returning list of ids that findExercises(filter) returns
// should only delete by 1 query category per call, will be handled in calling function
const deleteByQuery = async (filter) => {
    const result = await Exercise.deleteMany(filter);
    return result.deletedCount;
}

export { connect, createExercise, findExercises, findExerciseById, replaceExercise, patchById, deleteById, deleteByQuery };