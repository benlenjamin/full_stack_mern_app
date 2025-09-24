import '../App.css'
import EditInfo from '../components/EditInfo';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function EditPage({exerciseToEdit}){
    let id = useParams();

    const [exercise, setExercise] = useState([]);

    const loadExercise = async () => {
        const response = await fetch(`/exercises/${id.id}`)
        const data = await response.json();
        setExercise(data);
    }

    useEffect(() => {
        loadExercise();
    }, [exerciseToEdit]);


    return (
        <div className="editPage">
            <h2>This is the Edit Page</h2>
            <p>Pressing "Update" will update the chosen Exercise Entry.</p>
            
            <EditInfo exercise={exerciseToEdit}/>
        </div>
    )
}

export default EditPage;