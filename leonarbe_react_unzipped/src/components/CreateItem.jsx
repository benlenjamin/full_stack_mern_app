import '../App.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateInfo = () => {
    const navigate = useNavigate();
    
   
    const [name, setName] = useState('');
    const [reps, setReps] = useState();
    const [weight, setWeight] = useState();
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const createExercise = async (event) => {
        event.preventDefault();
        const newExercise = {name, reps, weight, unit, date}
        const response = await fetch(
            `/exercises`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newExercise)
            }
        );
        if (response.status === 201) {
            alert("Succesfully created and added.");
        }
        else {
            alert("Failed to create, status code = " + response.status);
        }
        navigate("/");
    };


    return (
        <div className="CreateInfo">
            <form>
                <fieldset>
                    <legend>Input Data Below:</legend>
                    <label>
                        <input type="text" placeholder="Exercise Name" value={name} onChange={e => setName(e.target.value)} />
                    </label>
                    <label>
                        <input type="number" placeholder="Number of Repetitions" value={reps} onChange={e => setReps(e.target.valueAsNumber)} />
                    </label>
                    <label>
                        <input type="number" placeholder="Weight" value={weight} onChange={e => setWeight(e.target.valueAsNumber)} />
                    </label>
                    <label onChange={e => setUnit(e.target.value)}>
                        <select name="units" id="unit-select">
                            <option value="">--Please choose a unit--</option>
                            <option value="lbs">lbs</option>
                            <option value="kgs">kgs</option>
                        </select>
                    </label>
                    <label>
                        <input type="text" placeholder="Date (MM-DD-YY)" value={date} onChange={e => setDate(e.target.value)} />
                    </label>
                    
                </fieldset>
                <button 
                    onClick={createExercise}
                >Create</button>
            </form>
        </div>
    );
}

export default CreateInfo;