import '../App.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditInfo = ({exercise}) => {
    const navigate = useNavigate();
    
   
    const [name, setName] = useState(exercise.name);
    const [reps, setReps] = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);
    const [unit, setUnit] = useState(exercise.unit);
    const [date, setDate] = useState(exercise.date);

    const editExercise = async (event) => {
        event.preventDefault();
        const editedExercise = {name, reps, weight, unit, date}
        const response = await fetch(
            `/exercises/${exercise._id}`, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(editedExercise)
            }
        );
        if (response.status === 200) {
            alert("Succesfully updated.");
        }
        else {
            alert("Failed to edit, status code = " + response.status);
        }
        navigate("/");
    };

    //for which unit is selected by default
    let oppositeUnit = unit === "lbs" ? "kgs" : "lbs";
    console.log(unit);
    console.log(oppositeUnit);

    return (
        <div className="EditInfo">
            <form>
                <fieldset>
                    <legend>Update Data Below:</legend>
                    <label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </label>
                    <label>
                        <input type="number" value={reps} onChange={e => setReps(e.target.valueAsNumber)} />
                    </label>
                    <label>
                        <input type="number" value={weight} onChange={e => setWeight(e.target.valueAsNumber)} />
                    </label>
                    <label onChange={e => setUnit(e.target.value)}>
                        <select name="unit" id="unit-select">
                            <option value={unit}>{unit}</option>
                            <option value={unit === "lbs" ? "kgs" : "lbs"}>{unit === "lbs" ? "kgs" : "lbs"}</option>
                        </select>
                    </label>
                    <label>
                        <input type="text" value={date} onChange={e => setDate(e.target.value)} />
                    </label>
                    
                </fieldset>
                <button 
                    onClick={editExercise}
                >Update</button>
            </form>
        </div>
    );
}

export default EditInfo;