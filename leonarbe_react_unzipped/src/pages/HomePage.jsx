import '../App.css'
import ExercisesTable from '../components/ExercisesTable';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
//import statement for icons here

function HomePage({setExerciseToEdit}){
    const [exercises, setExercises] = useState([]);
    const [reload, setReload] = useState(0);

    const loadExercises = async () => {
        const response = await fetch('/exercises')
        const data = await response.json();
        setExercises(data);
        setReload(0);
    }

    useEffect(() => {
        loadExercises();
    }, [reload]);

    return (
        <div className="homePage">
            <h2>This is the Home Page!</h2>
            <p>You can click on any of the above Hypertexts to traverse the website!</p>
            <p>Use the link above to add an order, or edit/delete an existing one below!</p>
        
            <div className="homePageTable"><ExercisesTable exercises={exercises} setReload={setReload} setExerciseToEdit={setExerciseToEdit} ></ExercisesTable></div>
        </div>
    );
}

export default HomePage;