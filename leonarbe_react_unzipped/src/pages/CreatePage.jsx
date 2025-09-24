import '../App.css'
import CreateInfo from '../components/CreateItem';

function CreatePage(){
    return (
        <div className="creationPage">
            <h2>This is the Creation Page</h2>
            <p>Here you can log new exercises!</p>
            <p>Fill in the boxes and hit "Create"" to save this entry!</p>

            <CreateInfo />
        </div>
    )
}

export default CreatePage;