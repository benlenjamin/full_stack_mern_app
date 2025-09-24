import ExerciseItem from './ExerciseItem';
import '../App.css'

function ExercisesTable({exercises, setReload, setExerciseToEdit}) {
    return (
        <table>

            <thead className="ExercisesHeader">
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            
            <tbody>{exercises.map((exercise, i) => <ExerciseItem exercise={exercise} key={i} setReload={setReload} setExerciseToEdit={setExerciseToEdit} />)}</tbody>
        </table>
    )
}

export default ExercisesTable;