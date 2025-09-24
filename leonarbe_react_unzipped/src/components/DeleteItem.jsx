import '../App.css'
import React, { useState, useEffect } from 'react';
import { MdCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function Delete({exercise, setReload}){
    const navigate = useNavigate();
    //const [count, setCount] = useState(0);
    //const [clicked, setClick] = useState(0);

    const deleteExercise = async () => {
        const response = await fetch(`/exercises/${exercise._id}`, { method: 'DELETE'});
        if (response.status === 204) {
            setReload(1);
            //navigate("/exercises");
        }
        else {
            console.error(`Failed to delete movie with id = ${exercise._id}, status code = ${response.status}`);
        }
    }

    //<span>{count}</span> copied from in div
    return (
        <div className="DeleteItem">
            <MdCancel onClick={deleteExercise} />
        </div>
    );
}

export default Delete;