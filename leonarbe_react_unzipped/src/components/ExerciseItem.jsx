import '../App.css'
import Edit from './EditItem';
import Delete from './DeleteItem';

//remove quantity
function ExerciseItem({exercise, setReload, setExerciseToEdit}) {

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>
                <Edit exerciseObject = {exercise} setExerciseToEdit={setExerciseToEdit}/>
            </td>
            <td>
                <Delete exercise = {exercise} setReload={setReload} />
            </td>
        </tr>
    )
}

export default ExerciseItem;