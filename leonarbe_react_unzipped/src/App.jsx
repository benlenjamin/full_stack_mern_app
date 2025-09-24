import './App.css';

//Now importing BrowserRouter
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navigation from './components/Navigation'

//now for pages
import HomePage from './pages/HomePage'
import OrderPage from './pages/OrderPage'
import CreatePage from './pages/CreatePage'
import EditPage from './pages/EditPage'

import { useState } from 'react';

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className = "app">
      <header>
        <h1>Exercise Tracker</h1>
        <p>This app allows you to create, read, update, and delete Exercise Entries.</p>
        <p>It is a Single Page Application and relies on MongoDB as a database.</p>
      </header>
      <Router>
      <Navigation />
      <Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route>
          <Route path="/editPage/:id" element={<EditPage exerciseToEdit={exerciseToEdit}/>}></Route>
          <Route path="/createPage" element={<CreatePage />}></Route>
      </Routes>
      </Router>
      <footer>
        <p>© 2024 Benjamin Leonard</p>
      </footer>
    </div>
  )
}

export default App
