import '../App.css'
import React, { useState, useEffect } from 'react';
import { MdBorderColor } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function Edit({exerciseObject, setExerciseToEdit}){
    const navigate = useNavigate();

    const editExercise = () => {
        setExerciseToEdit(exerciseObject);
        navigate(`/editPage/${exerciseObject._id}`);
    }

    return (
        <div className="EditItem">
            <MdBorderColor onClick={editExercise} />
        </div>
    );
}

export default Edit;