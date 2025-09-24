import { Link } from 'react-router-dom';
import '../App.css'

function Navigation(){
    return (
        <nav className="app-nav">
            <div className="homePageHypertext">
                <Link to="/">Home</Link>
            </div>

            <div className="createPageHypertext">
                <Link to="/createPage">Create/Add Exercise</Link>
            </div>
        </nav>
    )
}

export default Navigation;